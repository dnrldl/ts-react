import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import styles from "./Dropdown.module.scss";

export type Option<T = string> = {
  label: string;
  value: T;
  disabled?: boolean;
};

type DropdownProps<T = string> = {
  options: Option<T>[];
  placeholder?: string;
  className?: string;
  // 제어 모드
  value?: T;
  onChange?: (value: T, option: Option<T>) => void;
  // 비제어 모드
  defaultValue?: T;
  // 스타일/동작
  disabled?: boolean;
  maxHeight?: number; // 목록 최대 높이(px)
  size?: "sm" | "md" | "lg";
  name?: string; // 폼 사용 시
  ariaLabel?: string;
};

export default function Dropdown<T = string>({
  options,
  placeholder = "Select…",
  className,
  value,
  onChange,
  defaultValue,
  disabled,
  maxHeight = 240,
  size = "md",
  name,
  ariaLabel = "Dropdown",
}: DropdownProps<T>) {
  const isControlled = value !== undefined;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [innerValue, setInnerValue] = useState<T | undefined>(defaultValue);

  const currentValue = isControlled ? value : innerValue;

  const selectedIndex = useMemo(() => {
    return options.findIndex((o) => o.value === currentValue);
  }, [options, currentValue]);

  const handleSelect = (idx: number) => {
    const opt = options[idx];
    if (!opt || opt.disabled) return;
    if (!isControlled) setInnerValue(opt.value);
    onChange?.(opt.value, opt);
    setOpen(false);
    // 포커스 되돌리기
    buttonRef.current?.focus();
  };

  const toggleOpen = () => {
    if (disabled) return;
    setOpen((v) => !v);
  };

  // 바깥 클릭 닫기
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // 키보드 내비게이션
  const moveActive = (dir: 1 | -1) => {
    if (!open) setOpen(true);
    let i = activeIndex;
    const len = options.length;
    for (let step = 0; step < len; step++) {
      i = (i + dir + len) % len;
      if (!options[i].disabled) {
        setActiveIndex(i);
        break;
      }
    }
  };

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) setOpen(true);
        setActiveIndex(selectedIndex >= 0 ? selectedIndex : options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        setOpen((v) => !v);
        break;
      default:
        break;
    }
  };

  const onListKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveActive(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveActive(-1);
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (activeIndex >= 0) handleSelect(activeIndex);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  };

  // 열릴 때 활성 항목 초기화 + 스크롤 보정
  useEffect(() => {
    if (!open) return;
    const idx =
      selectedIndex >= 0
        ? selectedIndex
        : options.findIndex((o) => !o.disabled);
    setActiveIndex(idx);
    // 스크롤 위치 조정
    const list = listRef.current;
    const item = list?.children[idx] as HTMLElement | undefined;
    if (list && item) {
      const top = item.offsetTop;
      list.scrollTop = top - 8;
    }
  }, [open, selectedIndex, options]);

  const label = selectedIndex >= 0 ? options[selectedIndex].label : placeholder;

  return (
    <div
      ref={rootRef}
      className={clsx(styles.dropdown, styles[size], className, {
        [styles.disabled]: disabled,
        [styles.open]: open,
      })}
    >
      {name && (
        <input type="hidden" name={name} value={String(currentValue ?? "")} />
      )}
      <button
        ref={buttonRef}
        type="button"
        className={styles.button}
        onClick={toggleOpen}
        onKeyDown={onButtonKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        <span
          className={clsx(styles.label, !currentValue && styles.placeholder)}
        >
          {label}
        </span>
        <span className={styles.caret} aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          className={styles.menu}
          role="listbox"
          aria-activedescendant={
            activeIndex >= 0 ? `opt-${activeIndex}` : undefined
          }
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          style={{ maxHeight }}
        >
          {options.map((opt, i) => {
            const selected = i === selectedIndex;
            const active = i === activeIndex;
            return (
              <li
                id={`opt-${i}`}
                key={String(opt.value)}
                role="option"
                aria-selected={selected}
                aria-disabled={opt.disabled || undefined}
                tabIndex={-1}
                className={clsx(
                  styles.item,
                  selected && styles.selected,
                  active && styles.active,
                  opt.disabled && styles.itemDisabled
                )}
                onMouseEnter={() => !opt.disabled && setActiveIndex(i)}
                onMouseDown={(e) => e.preventDefault()} // focus 유지
                onClick={() => handleSelect(i)}
              >
                {opt.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
