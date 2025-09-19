import { useEffect, useRef } from "react";

type Options = {
  /** rootMargin으로 미리 당겨 로드 (e.g. "0px 0px 400px 0px") */
  rootMargin?: string;
  /** 0~1, 얼마나 보이면 트리거할지 */
  threshold?: number;
  /** 이미 로딩 중일 때 중복 트리거 막기 */
  disabled?: boolean;
  /** 보이면 호출할 콜백 (onEndReached) */
  onIntersect: () => void;
};

export function useIntersection<T extends HTMLElement>({
  rootMargin = "0px 0px 300px 0px",
  threshold = 0,
  disabled = false,
  onIntersect,
}: Options) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!ref.current || disabled) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !disabled) {
          onIntersect();
        }
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, [rootMargin, threshold, disabled, onIntersect]);

  return ref;
}
