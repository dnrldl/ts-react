// src/features/post/components/AddPostModal.tsx
import PostImagePreview from "features/post/components/PostImagePreview";
import PostImageUploader from "features/post/components/PostImageUploader";
import { useCreatePost } from "features/post/hooks/useCreatePost";
import { useState } from "react";
import LightBox, { LightboxOptions } from "shared/components/image/LightBox";
import Button from "shared/components/ui/Button/Button";
import { Modal } from "shared/components/ui/Modal/Modal";
import styles from "./AddPostModal.module.scss";

interface PostAddModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPostModal = ({ isOpen, onClose }: PostAddModalProps) => {
  const {
    form: {
      register,
      formState: { errors },
      watch,
    },
    mutation,
    fileRef,
    previews,
    setPreviews,
    files,
    setFiles,
    handlePickFiles,
    rows,
    onSubmit,
  } = useCreatePost({ onSuccessClose: onClose });

  const [lightbox, setLightbox] = useState<LightboxOptions>({
    open: false,
    index: 0,
    scale: 1,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton={false}>
      <form onSubmit={onSubmit} className={styles.form}>
        <textarea
          value={watch("content")}
          className={styles.textarea}
          placeholder="내용을 입력하세요"
          rows={rows + 4}
          {...register("content")}
        />
        {errors.content && (
          <p className="text-red-600 text-sm">
            {String(errors.content.message)}
          </p>
        )}

        {/* 업로더: 내부에서 input[type=file] onChange → handlePickFiles 호출 */}
        <PostImageUploader
          files={files}
          previews={previews}
          setFiles={setFiles}
          setPreviews={setPreviews}
          fileRef={fileRef}
          onPick={(fl) => handlePickFiles(fl)} // 만약 컴포넌트가 onPick을 지원한다면
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
    </Modal>
  );
};

export default AddPostModal;
