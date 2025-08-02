import ScrollToTopButton from "components/ui/Button/ScrollToTopButton";
import styles from "./Container.module.scss";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`${styles.container} ${className}`}>
      {children}
      <ScrollToTopButton />
    </div>
  );
};

export default Container;
