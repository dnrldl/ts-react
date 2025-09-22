import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createPostApi,
  fetchPresignedUrlsApi,
  registerPostImageApi,
  uploadToS3,
} from "features/post/api/api";
import { CreatePostFormValues, createPostSchema } from "features/post/schemas";

type UseCreatePostOptions = {
  onSuccessClose?: () => void; // 성공 시 모달 닫기 콜백 등
};

type Fulfilled = {
  file: File;
  presign: any; // 필요 시 타입 정교화
  index: number;
};

export function useCreatePost(opts?: UseCreatePostOptions) {
  const fileRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // 미리보기(URL.revokeObjectURL 관리)
  const [previews, setPreviews] = useState<string[]>([]);

  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(createPostSchema),
    defaultValues: { content: "", images: [] },
  });

  // RHF 상태 구독
  const content = form.watch("content");
  const files = form.watch("images") ?? [];

  useEffect(() => {
    return () => previews.forEach(URL.revokeObjectURL);
  }, [previews]);

  const setFiles = (arr: File[]) => {
    previews.forEach(URL.revokeObjectURL);
    setPreviews(arr.map((f) => URL.createObjectURL(f)));
    form.setValue("images", arr, { shouldValidate: true });
  };

  const handlePickFiles = (incoming: File[] | FileList | null) => {
    if (!incoming) return;
    const arr = Array.isArray(incoming) ? incoming : Array.from(incoming);
    setFiles(arr);
  };

  // 텍스트 영역 행수 계산(기존 UX 유지)
  const rows = useMemo(() => {
    const lines = (content?.match(/\n/g)?.length ?? 0) + 1;
    return Math.max(lines, 1);
  }, [content]);

  // 이미지 크기 메타 수집(선택)
  async function readImageSize(
    file: File
  ): Promise<{ width: number; height: number }> {
    const url = URL.createObjectURL(file);
    try {
      const img = document.createElement("img");
      img.src = url;
      await img.decode();
      return { width: img.naturalWidth, height: img.naturalHeight };
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // 핵심: useMutation (폼 값 전체를 변수로 받아 처리)
  const mutation = useMutation({
    mutationFn: async (values: CreatePostFormValues) => {
      const { content, images = [] } = values;

      // 1) 게시글 생성
      const postId = await createPostApi({ content }); // createPostApi 반환 형식에 맞춰 조정

      // 2) 이미지 없으면 종료
      if (!images.length) return Number(postId);

      // 3) presigned URL 발급
      const presigned = await fetchPresignedUrlsApi("POST_IMAGE", images);
      if (!presigned || presigned.length !== images.length) {
        throw new Error("Failed to get presigned URLs for all files");
      }

      // 4) 병렬 업로드
      const results = await Promise.allSettled(
        images.map((file, i) =>
          uploadToS3(presigned[i].presignedUrl, file).then(() => ({
            file,
            presign: presigned[i],
            index: i,
          }))
        )
      );

      const fulfilled = results
        .filter(
          (r): r is PromiseFulfilledResult<Fulfilled> =>
            r.status === "fulfilled"
        )
        .map((r) => r.value);

      const failedCount = results.length - fulfilled.length;
      if (failedCount > 0)
        toast.warning(`Some images failed to upload (${failedCount})`);

      if (fulfilled.length === 0) {
        toast.info("Post created without images due to upload failures");
        return Number(postId);
      }

      // 5) 메타 생성(선택)
      const withMeta = await Promise.all(
        fulfilled
          .sort((a, b) => a.index - b.index)
          .map(async ({ file, presign }, orderIndex) => {
            const meta = await readImageSize(file).catch(() => ({
              width: 0,
              height: 0,
            }));
            return {
              storageKey: presign.key,
              url: presign.fileUrl,
              width: meta.width,
              height: meta.height,
              bytes: file.size,
              mimeType: file.type,
              orderIndex,
              isThumbnail: orderIndex === 0,
            };
          })
      );

      // 6) 이미지 등록
      await registerPostImageApi(Number(postId), withMeta);

      return Number(postId);
    },
    onSuccess: () => {
      toast.success("Post and images uploaded successfully");
      // 폼/미리보기 초기화
      form.reset();
      previews.forEach(URL.revokeObjectURL);
      setPreviews([]);
      if (fileRef.current) fileRef.current.value = "";
      opts?.onSuccessClose?.();
    },
    onError: () => {
      toast.error("Failed to create post or upload images");
    },
  });

  // RHF submit 래퍼
  const onSubmit = form.handleSubmit((vals) => mutation.mutate(vals));

  return {
    form, // register, handleSubmit, formState 등
    mutation, // isPending 등
    fileRef,
    contentRef,
    previews,
    setPreviews,
    files, // watch("images")
    setFiles, // 기존 컴포넌트 호환용
    handlePickFiles, // <input type="file" onChange={e => handlePickFiles(e.target.files)}>
    rows, // textarea rows
    onSubmit, // 폼 onSubmit에 바로 사용
  };
}
