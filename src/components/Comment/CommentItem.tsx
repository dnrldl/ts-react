import styles from "./CommentItem.module.scss";
import { Comment } from "types/type";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.email}>{comment.authorNickname}</div>
      <p className="body">- {comment.content}</p>
    </div>
  );
};

export default CommentItem;
