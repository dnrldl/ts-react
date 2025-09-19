import clsx from "clsx";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Container.module.scss";
import ScrollToTopButton from "shared/components/ui/Button/ScrollToTopButton";

interface ContainerProps {
  children: ReactNode;
  backButton?: boolean;
  title?: ReactNode;
  rightSlot?: ReactNode;
  className?: string;
}

const Container = ({
  children,
  backButton,
  title,
  rightSlot,
  className,
}: ContainerProps) => {
  const navigate = useNavigate();

  return (
    <div className={clsx(styles.container, className)}>
      <header className={styles.toolbar}>
        {/* 좌측: 뒤로가기 또는 플레이스홀더(정렬 고정용) */}
        {backButton && (
          <button
            type="button"
            className={styles.backButton}
            onClick={() => navigate(-1)}
            aria-label="뒤로가기"
          >
            <ArrowLeft size={22} aria-hidden />
          </button>
        )}

        {/* 가운데: 타이틀 */}
        {title ? <h1 className={styles.title}>{title}</h1> : <span />}

        {/* 우측: 액션 영역(없어도 자리 유지) */}
        <div className={styles.right}>{rightSlot}</div>
      </header>

      <div className={styles.content}>{children}</div>

      <ScrollToTopButton />
    </div>
  );
};

export default Container;
