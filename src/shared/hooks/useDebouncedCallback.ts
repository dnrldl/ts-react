import { useEffect, useMemo } from "react";
import type { DebounceSettings } from "lodash";
import debounce from "lodash.debounce";

type AnyFn = (...args: any[]) => any;

/**
 * @param fn 실행할 함수
 * @param delay 디바운스 지연 시간(ms)
 * @param options leading/trailing/maxWait 등 lodash.debounce 옵션
 */
export function useDebouncedCallback<T extends AnyFn>(
  fn: T,
  delay: number,
  options?: DebounceSettings
) {
  // memoize로 매번 새로운 debounce 인스턴스 만들지 않게 함
  const debounced = useMemo(
    () => debounce(fn, delay, options),
    [fn, delay, options]
  );

  // 컴포넌트 unmount 시 debounce 취소
  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, [debounced]);

  // lodash.debounce가 제공하는 cancel/flush 메서드도 그대로 반환
  return debounced as T & { cancel: () => void; flush: () => ReturnType<T> };
}
