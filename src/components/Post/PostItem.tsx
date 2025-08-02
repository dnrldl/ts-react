import { Post } from "types/type";
import styles from "./PostItem.module.scss";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link to={String(post.id)} className={styles.container}>
      <div className={styles.postContent}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.body}>{post.body}</p>
      </div>
      <div className={styles.chevronRight}>
        <ChevronRight size={24} />
      </div>
    </Link>
  );
};

export default PostItem;
