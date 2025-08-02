import styles from "./PostDetailPage.module.scss";
import CommentList from "components/Comment/CommentList";
import Container from "components/Container";
import { useFetch } from "hooks/useFetch";
import { useParams } from "react-router-dom";
import { Post } from "types/type";
import { useState } from "react";
import LoadingSkeleton from "components/Loading/LoadingSkeleton";
import clsx from "clsx";

const PostDetail = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch<Post>(`/posts/${id}`);
  const [commentCount, setCommentCount] = useState<number>(0);

  if (loading) return <LoadingSkeleton />;
  if (error) <div>에러 발생: {error.message}</div>;
  if (!data) return null;

  return (
    <Container>
      {/* Header */}
      <div className={clsx(styles.header, "mb-header")}>
        <h1>{data.title}</h1>
      </div>
      <div className={styles.author}>author: {data.userId}</div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <h2 className={clsx("mb-header-22")}>Content</h2>
        <p>{data.body}</p>
      </div>

      {/* Comment */}
      <h2 className={clsx("mb-header-22")}>{commentCount} Comments</h2>
      <CommentList postId={data.id} setCommentCount={setCommentCount} />
    </Container>
  );
};

export default PostDetail;
