// useBodyScrollLock.ts
import { useEffect, useRef } from "react";

export function useScrollLock(isOpen: boolean) {
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const docEl = document.documentElement;
    const supportsGutter = CSS.supports?.("scrollbar-gutter: stable");

    scrollYRef.current = window.scrollY;

    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    if (!supportsGutter) {
      const scrollbarW = window.innerWidth - docEl.clientWidth;
      if (scrollbarW > 0) body.style.paddingRight = `${scrollbarW}px`;
    }

    docEl.style.overscrollBehavior = "none";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.width = "";
      body.style.paddingRight = "";
      docEl.style.overscrollBehavior = "";

      window.scrollTo(0, scrollYRef.current);
    };
  }, [isOpen]);
}
