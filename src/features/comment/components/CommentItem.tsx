import { formatDate, getAgoTime } from "utils/dateUtils";
import styles from "./CommentItem.module.scss";
import { Comment } from "shared/types/type";

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const commentTime = getAgoTime(formatDate(comment.createdAt));

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <img
          src="https://placehold.co/400"
          alt="user-profile"
          className={styles.image}
        />
      </div>

      <div className={styles.rightSection}>
        <div className={styles.content}>
          <span className={styles.nickname}>{comment.authorNickname}</span>
          <span className={styles.content}>{comment.content}</span>
        </div>

        <div className={styles.infoWrapper}>
          <div className={styles.time}>{commentTime}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
