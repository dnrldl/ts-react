import { formatDate, getAgoTime } from "utils/dateUtils";
import styles from "./CommentItem.module.scss";
import { Comment } from "types/type";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const commentTime = getAgoTime(formatDate(comment.createdAt));

  return (
    <div className={styles.container}>
      <div className={styles.infoWrapper}>
        <div className={styles.nickname}>{comment.authorNickname}</div>
        <div className={styles.time}>{commentTime}</div>
      </div>

      <p>{comment.content}</p>
    </div>
  );
};

export default CommentItem;
