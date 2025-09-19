import React from "react";
import { toast } from "sonner";
import styles from "./PostImageUploader.module.scss";
import { Camera } from "lucide-react";

const MAX_FILES = 10;
const ACCEPT = "image/*";

interface PostImageUploaderProps {
  files: File[];
  previews: string[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
  fileRef: React.RefObject<HTMLInputElement | null>;
}

const PostImageUploader = ({
  files,
  previews,
  setFiles,
  setPreviews,
  fileRef,
}: PostImageUploaderProps) => {
  /** 파일 선택/드롭 처리 */
  const upsertFiles = (incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const onlyImages = arr.filter((f) => f.type.startsWith("image/"));
    if (incoming.length !== onlyImages.length) {
      toast.warning("Not allow file extensions!");
      return;
    }

    // 중복 제거(이름+크기 기준), 최대 개수 제한
    const merged = [...files, ...onlyImages]
      .reduce<File[]>((acc, f) => {
        const exists = acc.some((x) => x.name === f.name && x.size === f.size);
        if (!exists) acc.push(f);
        return acc;
      }, [])
      .slice(0, MAX_FILES);

    // previews 동기화
    previews.forEach(URL.revokeObjectURL);
    const urls = merged.map((f) => URL.createObjectURL(f));

    setFiles(merged);
    setPreviews(urls);
  };
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) upsertFiles(e.target.files);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.clientX);
    console.log(e.dataTransfer.files);
    // if (e.dataTransfer.files) upsertFiles(e.dataTransfer.files);
  };

  return (
    <div>
      {/* 업로더 */}
      <section
        className={styles.uploader}
        onDrop={onDrop}
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
            드래그 앤 드롭 또는 클릭해서 선택 · 최대 {MAX_FILES}장
          </span>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept={ACCEPT}
          multiple
          onChange={onInputChange}
          className={styles.hiddenInput}
        />
      </section>
    </div>
  );
};

export default PostImageUploader;
