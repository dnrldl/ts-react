import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>로딩 중...</p>
    </div>
  );
};

export default Loading;
