import styles from "./PostImages.module.scss";

interface PostImagesProps {
  urls: string[];
}

const PostImages = ({ urls }: PostImagesProps) => {
  if (!urls?.length) return null;

  if (urls.length === 1) {
    return (
      <img
        className={styles.singleImage}
        src={urls[0]}
        alt=""
        loading="lazy"
        decoding="async"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />
    );
  }

  return (
    <ul className={styles.grid}>
      {urls.map((src, i) => (
        <li key={src + i} className={styles.cell}>
          <img
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </li>
      ))}
    </ul>
  );
};

export default PostImages;
