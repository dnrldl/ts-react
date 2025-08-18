import { useMutation } from "@tanstack/react-query";
import { createPost, registerPostImage } from "api/posts";
import { getMultiplePresignedUrls, putImagesOnS3 } from "api/s3";
import Container from "components/Container";
import LightBox, { LightboxOptions } from "components/image/LightBox";
import PostImagePreview from "components/Post/PostImagePreview";
import PostImageUploader from "components/Post/PostImageUploader";
import Button from "components/ui/Button/Button";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import styles from "./PostAddPage.module.scss";

export const PostAddPage = () => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState<LightboxOptions>({
    open: false,
    index: 0,
    scale: 1,
  });
  const fileRef = useRef<HTMLInputElement>(null);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  // objectURL 정리
  useEffect(() => {
    return () => previews.forEach(URL.revokeObjectURL);
  }, [previews]);

  const mutation = useMutation({
    mutationFn: (content: string) => createPost(content),
    onSuccess: () => {
      navigate("/posts");
    },
    onError: () => toast.error("Error!"),
  });

  /** 제출 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.info("Please insert content!");
      contentRef.current?.focus();
      return;
    }

    try {
      // 1) 게시글 생성
      const postId = await mutation.mutateAsync(content.trim());

      // 2) 파일 없으면 종료
      if (files.length === 0) {
        toast.success("Post created successfully");
        return;
      }

      // 3) presign
      const presigned = await getMultiplePresignedUrls("POST_IMAGE", files);
      if (!presigned || presigned.length !== files.length) {
        toast.error("Failed to get presigned URLs for all files");
        return;
      }

      // 4) 병렬 업로드
      const uploadResults = await Promise.allSettled(
        files.map((file, i) =>
          putImagesOnS3(presigned[i].presignedUrl, file).then(() => ({
            file,
            presign: presigned[i],
            index: i,
          }))
        )
      );

      const fulfilled = uploadResults
        .filter(
          (
            r
          ): r is PromiseFulfilledResult<{
            file: File;
            presign: any;
            index: number;
          }> => r.status === "fulfilled"
        )
        .map((r) => r.value);

      const failedCount = uploadResults.length - fulfilled.length;
      if (failedCount > 0)
        toast.warning(`Some images failed to upload (${failedCount})`);
      if (fulfilled.length === 0) {
        toast.info("Post created without images due to upload failures");
        return;
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

      // 6) 서버에 이미지 등록
      await registerPostImage(postId, withMeta);

      toast.success("Post and images uploaded successfully");
      // 완료 후 초기화
      setFiles([]);
      previews.forEach(URL.revokeObjectURL);
      setPreviews([]);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      toast.error("Failed to create post or upload images");
    }
  };

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

  // 현재 값의 줄 수 = 개행 수 + 1
  const rows = useMemo(() => {
    const lines = (content.match(/\n/g)?.length ?? 0) + 1;
    return Math.max(lines, 1);
  }, [content]);

  return (
    <Container title="Add Post" backButton>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Content
          <textarea
            ref={contentRef}
            className={styles.textarea}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력하세요"
            rows={rows + 4}
          />
        </label>

        <PostImageUploader
          files={files}
          previews={previews}
          setFiles={setFiles}
          setPreviews={setPreviews}
          fileRef={fileRef}
        />

        <PostImagePreview
          previews={previews}
          files={files}
          setFiles={setFiles}
          setPreviews={setPreviews}
          setLightbox={setLightbox}
          fileRef={fileRef}
        />

        <div className={styles.button}>
          <Button type="submit">
            {mutation.isPending ? "Post..." : "Post"}
          </Button>
        </div>
      </form>

      <LightBox
        lightbox={lightbox}
        setLightbox={setLightbox}
        previews={previews}
      />
    </Container>
  );
};

export default PostAddPage;
