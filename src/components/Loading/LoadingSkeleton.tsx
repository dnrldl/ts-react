import styles from "./LoadingSkeleton.module.scss";

const LoadingSkeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      {[...Array(3)].map((_, i) => (
        <div key={i} className={styles.skeletonCard}></div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
