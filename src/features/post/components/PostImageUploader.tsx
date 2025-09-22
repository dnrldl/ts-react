// PostImageUploader.tsx
import React from "react";
import { toast } from "sonner";
import styles from "./PostImageUploader.module.scss";
import { Camera } from "lucide-react";
import { FileInputRef } from "features/post/types";

const DEFAULT_MAX_FILES = 10;
const DEFAULT_ACCEPT = "image/*";

interface PostImageUploaderProps {
  files: File[];
  previews: string[];

  // ⛳️ useState setter가 아니라, (arr: File[]) => void 콜백으로 받는다
  setFiles: (next: File[]) => void;
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>;

  // RefObject 제네릭에 굳이 null 합칠 필요 없음(RefObject는 내부적으로 current가 null 가능)
  fileRef: FileInputRef;

  // 선택: 훅과 직접 연결하고 싶을 때 사용
  onPick?: (files: File[]) => void;

  maxFiles?: number;
  accept?: string;
}

const PostImageUploader = ({
  files,
  previews,
  setFiles,
  setPreviews,
  fileRef,
  onPick,
  maxFiles = DEFAULT_MAX_FILES,
  accept = DEFAULT_ACCEPT,
}: PostImageUploaderProps) => {
  const upsertFiles = (incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const onlyImages = arr.filter((f) => f.type.startsWith("image/"));
    if (incoming.length !== onlyImages.length) {
      toast.warning("Not allow file extensions!");
      return;
    }

    const merged = [...files, ...onlyImages]
      .reduce<File[]>((acc, f) => {
        const exists = acc.some((x) => x.name === f.name && x.size === f.size);
        if (!exists) acc.push(f);
        return acc;
      }, [])
      .slice(0, maxFiles);

    if (onPick) {
      onPick(merged); // ✅ 훅에 위임
    } else {
      // 레거시/독립 사용: 이 컴포넌트가 직접 previews 관리
      previews.forEach(URL.revokeObjectURL);
      const urls = merged.map((f) => URL.createObjectURL(f));
      setFiles(merged);
      setPreviews(urls);
    }
  };

  return (
    <section
      className={styles.uploader}
      onDrop={(e) => {
        e.preventDefault();
        if (e.dataTransfer.files) upsertFiles(e.dataTransfer.files);
      }}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => fileRef.current?.click()}
      role="button"
      aria-label="이미지 선택 또는 드래그 앤 드롭"
    >
      <div className={styles.uploaderIcon}>
        <Camera />
      </div>
      <div className={styles.uploaderText}>
        <strong>이미지 업로드</strong> (여러 장 가능)
        <span className={styles.help}>
          드래그 앤 드롭 또는 클릭해서 선택 · 최대 {maxFiles}장
        </span>
      </div>
      <input
        ref={fileRef}
        type="file"
        accept={accept}
        multiple
        onChange={(e) => e.target.files && upsertFiles(e.target.files)}
        className={styles.hiddenInput}
      />
    </section>
  );
};

export default PostImageUploader;
