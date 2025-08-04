import { Post } from "types/type";
import styles from "./PostItem.module.scss";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getAgoTime } from "utils/dateUtils";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link to={String(post.id)} className={styles.container}>
      <div className={styles.postContent}>
        <h3 className={styles.title}>{post.content}</h3>

        <div>{getAgoTime(post.createdAt.toString())}</div>

        <div className="nickname">{post.authorNickname}</div>
        <p className={styles.body}>{post.content}</p>
      </div>

      <div className={styles.chevronRight}>
        <ChevronRight size={24} />
      </div>
    </Link>
  );
};

export default PostItem;
