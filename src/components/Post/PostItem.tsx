import { Post } from "types/type";
import styles from "./PostItem.module.scss";
import { Link } from "react-router-dom";
import { getAgoTime } from "utils/dateUtils";
import { Heart, MessageCircle } from "lucide-react";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link to={String(post.id)} className={styles.postCard}>
      <div className={styles.meta}>
        <span className={styles.nickname}>{post.authorNickname}</span>{" "}
        <span className={styles.time}>
          {getAgoTime(post.createdAt.toString())}
        </span>
      </div>
      <div className={styles.content}>{post.content}</div>
      <div className={styles.footer}>
        <span
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("asdasdsa");
          }}
          className={styles.action}
        >
          <Heart /> {post.likeCount}
        </span>
        <span className={styles.action}>
          <MessageCircle /> {post.commentCount}
        </span>
      </div>
    </Link>
  );
};

export default PostItem;
