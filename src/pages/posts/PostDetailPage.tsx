import { useQuery } from "@tanstack/react-query";
import { getPostDetail } from "api/posts";
import CommentSection from "components/Comment/CommentSection";
import Container from "components/Container";
import LoadingSkeleton from "components/Loading/LoadingSkeleton";
import { useParams } from "react-router-dom";
import styles from "./PostDetailPage.module.scss";
import PostImages from "components/Post/PostImages";

const PostDetail = () => {
  const { id } = useParams();

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPostDetail(Number(id!)),
    enabled: !!id,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <div>에러 발생: {(error as Error).message}</div>;
  if (!post) return null;

  return (
    <Container backButton>
      <div className={styles.author}>{post.authorNickname}</div>

      {/* Content */}
      <div className={styles.contentWrapper}>
        <h2 className="mb-header-22">Content</h2>
        <p>{post.content}</p>
        <PostImages urls={post.imageUrls ? post.imageUrls : []} />
      </div>

      {/* Comments */}
      <CommentSection postId={Number(id)} />
    </Container>
  );
};

export default PostDetail;
