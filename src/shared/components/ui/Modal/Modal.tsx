import { ReactNode, useEffect } from "react";
import styles from "./Modal.module.scss";
import { X } from "lucide-react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  backdropClose?: boolean;
  closeButton?: boolean;
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  width?: "maxWidth600" | "maxWidth1440" | "maxWidth1200";
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  backdropClose = true,
  closeButton = true,
  headerLeft,
  headerRight,
  width = "maxWidth1200",
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
      {closeButton && (
        <button
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X />
        </button>
      )}
      <div
        className={clsx(styles.modalContent, styles[width])}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {headerLeft ||
          (headerRight && (
            <div className={styles.header}>
              <div className={styles.headerLeft}>{headerLeft}</div>
              <div className={styles.headerRight}>{headerRight}</div>
            </div>
          ))}

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};
