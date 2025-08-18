import clsx from "clsx";
import { useCurrentUrl } from "hooks/useCurrentUrl";
import { toast } from "sonner";
import styles from "./PostOptionModal.module.scss";
import { Modal } from "components/ui/Modal/Modal";
import { useMemo } from "react";

type ModalOption = {
  id: string;
  title: string;
  tag: "REPORT" | "NORMAL";
  onClick?: () => void | Promise<void>;
};

interface PostOptionModalProps {
  isOpen: boolean;
  postId: number;
  onClose: () => void;
}

const PostOptionModal = ({ isOpen, postId, onClose }: PostOptionModalProps) => {
  const url = useCurrentUrl();

  const options: ReadonlyArray<ModalOption> = useMemo(
    () =>
      [
        {
          id: "report",
          title: "신고",
          tag: "REPORT",
          onClick: () => {},
        },
        {
          id: "copy-link",
          title: "링크 복사",
          tag: "NORMAL",
          onClick: () => {
            try {
              navigator.clipboard.writeText(`${url}/${postId}`);
              toast.success("Copied link!");
              onClose();
            } catch (error) {
              toast.error("Copy failed!");
            }
          },
        },
        {
          id: "cancel",
          title: "취소",
          tag: "NORMAL",
          onClick: onClose,
        },
      ] as const,
    [postId, onClose, url]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton={false}>
      <div className={styles.modal}>
        {options.map((item) => {
          return (
            <button
              key={item.id}
              className={clsx(
                styles.modalItem,
                item.tag === "REPORT" && styles.report
              )}
              onClick={item.onClick}
            >
              {item.title}
            </button>
          );
        })}
      </div>
    </Modal>
  );
};

export default PostOptionModal;
