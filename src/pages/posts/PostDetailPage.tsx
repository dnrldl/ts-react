import styles from "./PostDetailPage.module.scss";
import CommentList from "components/Comment/CommentList";
import Container from "components/Container";
import { useParams } from "react-router-dom";
import LoadingSkeleton from "components/Loading/LoadingSkeleton";
import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "api/posts";
import { useState } from "react";

const PostDetail = () => {
  const { id } = useParams();
  const [commentCount, setCommentCount] = useState<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostDetail(id!),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!data) return null;

  const post = data.data;

  return (
    <Container>
      {/* Header */}
      <div className={clsx(styles.header, "mb-header")}>
        <h1>{post.content}</h1>
      </div>
      <div className={styles.author}>author: {post.authorNickname}</div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <h2 className={clsx("mb-header-22")}>Content</h2>
        <p>{post.content}</p>
      </div>

      {/* Comment */}
      <h2 className={clsx("mb-header-22")}>{commentCount} Comments</h2>
      <CommentList postId={post.id} setCommentCount={setCommentCount} />
    </Container>
  );
};

export default PostDetail;
