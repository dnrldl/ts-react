import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "./ImageCarousel.module.scss";

type ImageItem = {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  id?: string | number;
};

export type ImageCarouselProps = {
  images: Array<string | ImageItem>;
  initialIndex?: number;
  loop?: boolean; // 끝에서 처음으로(순환). 기본 false
  showDots?: boolean; // 하단 인디케이터
  className?: string;
  fit?: "contain" | "cover"; // object-fit
  onIndexChange?: (index: number) => void;
};

const toItem = (x: string | ImageItem): ImageItem =>
  typeof x === "string" ? { src: x } : x;

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

const SWIPE_THRESHOLD = 50; // px

const ImageCarousel: React.FC<ImageCarouselProps> = ({
  images,
  initialIndex = 0,
  loop = false,
  showDots = true,
  className,
  fit = "contain",
  onIndexChange,
}) => {
  const items = useMemo(() => images.map(toItem), [images]);
  const [index, setIndex] = useState(() =>
    clamp(initialIndex, 0, Math.max(items.length - 1, 0))
  );
  const trackRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // announce index to parent
  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  const go = useCallback(
    (next: number) => {
      if (items.length === 0) return;
      if (loop) {
        const wrapped = (next + items.length) % items.length;
        setIndex(wrapped);
      } else {
        setIndex(clamp(next, 0, items.length - 1));
      }
    },
    [items.length, loop]
  );

  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  // keyboard navigation
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // touch/swipe
  const startX = useRef<number | null>(null);
  const deltaX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    deltaX.current = 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    deltaX.current = e.touches[0].clientX - startX.current;
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
      trackRef.current.style.transform = `translateX(calc(${-index * 100}% + ${
        deltaX.current
      }px))`;
    }
  };
  const onTouchEnd = () => {
    if (trackRef.current) {
      trackRef.current.style.transition = ""; // revert to css
    }
    if (Math.abs(deltaX.current) > SWIPE_THRESHOLD) {
      deltaX.current < 0 ? next() : prev();
    } else {
      // snap back
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-index * 100}%)`;
      }
    }
    startX.current = null;
    deltaX.current = 0;
  };

  const canPrev = loop || index > 0;
  const canNext = loop || index < items.length - 1;

  if (!items.length) {
    return (
      <div className={clsx(styles.carousel, className)} aria-live="polite">
        <div className={styles.empty}>이미지가 없습니다.</div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={clsx(styles.carousel, className)}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="게시글 이미지 캐러셀"
    >
      <div
        ref={trackRef}
        className={styles.track}
        style={{ transform: `translateX(${-index * 100}%)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {items.map((img, i) => (
          <div
            key={img.id ?? img.src ?? i}
            className={styles.slide}
            aria-hidden={i !== index}
          >
            <img
              src={img.src}
              alt={img.alt ?? `이미지 ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className={clsx(
                styles.image,
                fit === "cover" ? styles.cover : styles.contain
              )}
            />
          </div>
        ))}
      </div>

      {/* 이전, 다음 버튼 */}
      {items.length > 1 && (
        <>
          <button
            type="button"
            className={clsx(styles.navBtn, styles.prev)}
            onClick={prev}
            disabled={!canPrev}
            aria-label="이전 이미지"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            className={clsx(styles.navBtn, styles.next)}
            onClick={next}
            disabled={!canNext}
            aria-label="다음 이미지"
          >
            <ChevronRight />
          </button>
        </>
      )}

      {/* 페이지 인디케이터 */}
      {showDots && items.length > 1 && (
        <div
          className={styles.dots}
          role="tablist"
          aria-label="페이지 인디케이터"
        >
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1} / ${items.length}`}
              className={clsx(styles.dot, i === index && styles.activeDot)}
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}

      <div className={styles.srOnly} aria-live="polite">
        {index + 1} / {items.length}
      </div>
    </div>
  );
};

export default ImageCarousel;
