import styles from "./CommentItem.module.scss";
import { Comment } from "types/type";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.email}>{comment.email}</div>
      <div className={styles.email}>{comment.name}</div>
      <p className="body">- {comment.body}</p>
    </div>
  );
};

export default CommentItem;
