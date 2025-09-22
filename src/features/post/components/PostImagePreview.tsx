// PostImagePreview.tsx
import { LightboxOptions } from "shared/components/image/LightBox";
import { X } from "lucide-react";
import React from "react";
import styles from "./PostImagePreview.module.scss";
import { FileInputRef } from "features/post/types";

interface PostImagePreviewProps {
  previews: string[];
  files: File[];

  // ⛳️ 여기서도 콜백 시그니처로
  setFiles: (next: File[]) => void;

  // 선택: 레거시 모드에서만 필요(훅 쓰면 안 넘겨도 됨)
  setPreviews?: React.Dispatch<React.SetStateAction<string[]>>;

  setLightbox: React.Dispatch<React.SetStateAction<LightboxOptions>>;
  fileRef: FileInputRef;
}

const PostImagePreview = ({
  previews,
  files,
  setFiles,
  setPreviews,
  setLightbox,
  fileRef,
}: PostImagePreviewProps) => {
  const onRemove = (index: number) => {
    const nextFiles = files.filter((_, i) => i !== index);

    if (setPreviews) {
      const nextPreviews = previews.filter((u, i) => {
        if (i === index) URL.revokeObjectURL(u);
        return i !== index;
      });
      setFiles(nextFiles);
      setPreviews(nextPreviews);
    } else {
      // ✅ 훅이 previews를 재생성/정리
      setFiles(nextFiles);
    }

    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      {previews.length > 0 && (
        <ul className={styles.grid}>
          {previews.map((src, i) => (
            <li key={src} className={styles.cell}>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(i);
                }}
                aria-label="이미지 삭제"
                title="삭제"
              >
                <X />
              </button>
              <img
                src={src}
                alt={`선택한 이미지 ${i + 1}`}
                className={styles.thumb}
                loading="lazy"
                decoding="async"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox({ open: true, index: i, scale: 1 });
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default PostImagePreview;
