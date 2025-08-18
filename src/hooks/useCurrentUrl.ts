import { useLocation, useHref } from "react-router-dom";
import { useMemo } from "react";

export function useCurrentPath(): string {
  const { pathname, search, hash } = useLocation();
  return useMemo(
    () => `${pathname}${search}${hash}` || "/",
    [pathname, search, hash]
  );
}

export function useCurrentUrl(): string {
  const path = useCurrentPath();

  // basename을 쓰는 라우터라면 useHref를 이용해 라우터 기준으로 보정 가능
  // (path를 그대로 넣으면 basename이 앞에 붙은 href를 돌려줌)
  const hrefWithBase = useHref(path);

  return useMemo(() => {
    const origin =
      typeof window !== "undefined" && window.location?.origin
        ? window.location.origin
        : "";

    return origin ? origin + hrefWithBase : hrefWithBase;
  }, [hrefWithBase]);
}
