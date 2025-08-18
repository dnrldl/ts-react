import { useEffect } from "react";
import styles from "./Modal.module.scss";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backdropClose?: boolean;
  closeButton?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  backdropClose = true,
  closeButton = true,
}: ModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={backdropClose ? onClose : undefined}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {closeButton && (
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Close modal"
          >
            <X />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};
