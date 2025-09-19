import { ArrowLeft, ArrowRight, Minus, Plus, X } from "lucide-react";
import React, { useCallback, useEffect } from "react";
import styles from "./LightBox.module.scss";

export type LightboxOptions = {
  open: boolean;
  index: number;
  scale: number;
};

interface LightboxProps {
  lightbox: LightboxOptions;
  setLightbox: React.Dispatch<React.SetStateAction<LightboxOptions>>;
  previews: string[];
}

const LightBox = ({ lightbox, setLightbox, previews }: LightboxProps) => {
  const closeLightbox = useCallback(
    () => setLightbox((s) => ({ ...s, open: false, scale: 1 })),
    [setLightbox]
  );
  const zoomIn = () =>
    setLightbox((s) => ({ ...s, scale: Math.min(s.scale + 0.25, 4) }));
  const zoomOut = () =>
    setLightbox((s) => ({ ...s, scale: Math.max(s.scale - 0.25, 0) }));
  const prevImg = useCallback(
    () =>
      setLightbox((s) => ({
        ...s,
        index: (s.index - 1 + previews.length) % previews.length,
        scale: 1,
      })),
    [previews.length, setLightbox]
  );
  const nextImg = useCallback(
    () =>
      setLightbox((s) => ({
        ...s,
        index: (s.index + 1) % previews.length,
        scale: 1,
      })),
    [previews.length, setLightbox]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!lightbox.open) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImg();
      if (e.key === "ArrowRight") nextImg();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox.open, previews.length, nextImg, prevImg, closeLightbox]);

  return (
    <div>
      {/* 라이트박스 */}
      {lightbox.open && previews.length > 0 && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div
            className={styles.lightboxToolbar}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={zoomOut}
              className={styles.tbBtn}
              aria-label="축소"
            >
              <Minus />
            </button>
            <span className={styles.scale}>
              {Math.round(lightbox.scale * 100)}%
            </span>
            <button onClick={zoomIn} className={styles.tbBtn} aria-label="확대">
              <Plus />
            </button>
            <button
              onClick={prevImg}
              className={styles.tbBtn}
              aria-label="이전"
            >
              <ArrowLeft />
            </button>
            <button
              onClick={nextImg}
              className={styles.tbBtn}
              aria-label="다음"
            >
              <ArrowRight />
            </button>
            <button
              onClick={closeLightbox}
              className={styles.tbBtn}
              aria-label="닫기"
            >
              <X />
            </button>
          </div>
          <img
            src={previews[lightbox.index]}
            alt="미리보기 확대"
            className={styles.lightboxImg}
            style={{ transform: `scale(${lightbox.scale})` }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default LightBox;
