import { useQuery } from "@tanstack/react-query";
import Container from "shared/layouts/container";
import LoadingSkeleton from "shared/components/loading/LoadingSkeleton";
import { useParams } from "react-router-dom";
import styles from "./PostDetailPage.module.scss";
import PostImages from "features/post/components/PostImages";
import ImageCarousel from "shared/components/ui/image/ImageCarousel";
import { fetchPostDetailApi } from "features/post/api/api";
import CommentSection from "features/comment/components/CommentSection";

const PostDetail = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => fetchPostDetailApi(Number(id!)),
    enabled: !!id,
  });

  const post = data;

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

        <ImageCarousel images={post.imageUrls!} />
      </div>

      {/* Comments */}
      <CommentSection postId={Number(id)} />
    </Container>
  );
};

export default PostDetail;
