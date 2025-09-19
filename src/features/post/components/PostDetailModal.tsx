import { useQuery } from "@tanstack/react-query";

import LoadingSkeleton from "shared/components/loading/LoadingSkeleton";
import ImageCarousel from "shared/components/ui/image/ImageCarousel";
import { Modal } from "shared/components/ui/Modal/Modal";

import styles from "./PostDetailModal.module.scss";
import { fetchPostDetailApi } from "features/post/api/api";
import CommentSection from "features/comment/components/CommentSection";
import { useScrollLock } from "shared/hooks/useScrollLock";

interface PostDetailModalProps {
  postId: number;
  isOpen: boolean;
  onClose: () => void;
}

const PostDetailModal = ({ postId, isOpen, onClose }: PostDetailModalProps) => {
  useScrollLock(isOpen);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["postDetail", postId],
    queryFn: () => fetchPostDetailApi(Number(postId)),
    enabled: !!postId,
  });

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <div>에러 발생: {(error as Error).message}</div>;
  if (!post) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeButton width="maxWidth1440">
      <div className={styles.container}>
        {/* 이미지 */}

        <div className={styles.leftSection}>
          <ImageCarousel images={post.imageUrls ? post.imageUrls : []} />
        </div>

        {/* 댓글 */}
        <div className={styles.rightSection}>
          <div className={styles.authorSection}>
            <div className={styles.nickname}>{post.authorNickname}</div>
          </div>

          <CommentSection postId={postId} />
        </div>
      </div>
    </Modal>
  );
};

export default PostDetailModal;
