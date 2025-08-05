import { useMutation, useQuery } from "@tanstack/react-query";
import { getPostDetail } from "api/posts";
import clsx from "clsx";
import CommentList from "components/Comment/CommentList";
import Container from "components/Container";
import LoadingSkeleton from "components/Loading/LoadingSkeleton";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./PostDetailPage.module.scss";
import { createComment } from "api/comments";
import { toast } from "sonner";

const PostDetail = () => {
  const { id } = useParams();
  const [commentCount, setCommentCount] = useState<number>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostDetail(id!),
    enabled: !!id,
  });

  const mutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      toast.success("Success!");
    },
    onError: () => {
      toast.error("Error!");
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

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
      {/* <CommentEditor postId={String(id)} onSubmit={} /> */}
      <CommentList postId={post.id} setCommentCount={setCommentCount} />
    </Container>
  );
};

export default PostDetail;
