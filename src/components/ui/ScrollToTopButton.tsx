import styles from "./ScrollToTopButton.module.scss";
import { CircleChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200); // 200px 이상 스크롤되면 보이게
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <button onClick={scrollToTop} className={styles.scrollTopButton}>
      <CircleChevronUp />
    </button>
  );
};

export default ScrollToTopButton;
