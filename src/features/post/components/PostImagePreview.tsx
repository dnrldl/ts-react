import { LightboxOptions } from "shared/components/image/LightBox";
import { X } from "lucide-react";
import React from "react";
import styles from "./PostImagePreview.module.scss";

interface PostImagePreviewProps {
  previews: string[];
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
  setLightbox: React.Dispatch<React.SetStateAction<LightboxOptions>>;
  fileRef: React.RefObject<HTMLInputElement | null>;
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
    const nextPreviews = previews.filter((u, i) => {
      if (i === index) URL.revokeObjectURL(u);
      return i !== index;
    });
    setFiles(nextFiles);
    setPreviews(nextPreviews);
    if (fileRef.current) fileRef.current.value = ""; // 같은 파일 재선택 가능하게 초기화
  };

  const openLightbox = (index: number) =>
    setLightbox({ open: true, index, scale: 1 });
  return (
    <div>
      {/* 미리보기 그리드 */}
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
                  openLightbox(i);
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostImagePreview;
