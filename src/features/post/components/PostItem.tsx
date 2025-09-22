import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import PostDetailModal from "features/post/components/PostDetailModal";
import PostOptionModal from "features/post/components/PostOptionModal";
import usePostLike from "features/post/hooks/usePostLike";
import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useUserStore } from "shared/stores/userStore";
import { getAgoTime } from "utils/dateUtils";
import styles from "./PostItem.module.scss";
import { useModal } from "shared/hooks/useModal";
import { Post } from "features/post/types";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  const isLoggedIn = useUserStore((s) => s.isLoggedIn)();
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount);
  const [showFullContent, setShowFullContent] = useState<boolean>(false);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const {
    isOpen: isOpenOption,
    open: openOption,
    close: closeOption,
  } = useModal();
  const {
    isOpen: isOpenDetail,
    open: openDetail,
    close: closeDetail,
  } = useModal();

  const contentRef = useRef<HTMLDivElement>(null);

  const qc = useQueryClient();
  const { likeMutate, unlikeMutate } = usePostLike({
    postId: post.id,
    setIsLiked,
    setLikeCount,
    qc,
  });

  const handleClickLike = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn) {
      toast.warning("Require login to like post!");
      return;
    }

    isLiked ? unlikeMutate.mutate() : likeMutate.mutate();
  };

  // 접힘 상태일 때만 "더보기 필요 여부" 측정
  useLayoutEffect(() => {
    if (showFullContent) return;
    const el = contentRef.current;
    if (!el) return;

    // 화면에서 넘치는지 확인
    const check = () => setIsOverflowing(el.scrollHeight > el.clientHeight + 1);

    // 최초 측정
    check();

    // 리사이즈/글꼴 로딩 등 레이아웃 변화를 커버
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [post.content, showFullContent]);

  return (
    <div className={styles.postCard}>
      {/* 정보 */}
      <div className={styles.header}>
        <div>
          <span className={styles.nickname}>{post.authorNickname}</span> {" • "}
          <span className={styles.time}>
            {getAgoTime(post.createdAt.toString())}
          </span>
        </div>

        {/* ...버튼 */}
        <div
          onClick={() => {
            openOption();
          }}
          className={styles.ellipsis}
        >
          <Ellipsis size={14} />
        </div>
      </div>

      {/* 이미지 */}
      {/* <div className={styles.image}>
        <PostImages urls={post.thumbnailUrl ? [post.thumbnailUrl] : []} />
      </div> */}

      {/* 좋아요, 댓글수 등등 */}
      <div className={styles.actionWrapper}>
        <button onClick={handleClickLike} className={styles.action}>
          {isLiked ? <Heart fill="red" color="red" /> : <Heart />}
          {likeCount}
        </button>
        <button onClick={() => openDetail()}>
          <span className={styles.action}>
            <MessageCircle />
            {post.commentCount}
          </span>
        </button>
      </div>

      {/* 본문 */}
      <div>
        <div
          ref={contentRef}
          className={clsx(
            styles.content,
            showFullContent ? styles.expanded : styles.collapsed
          )}
        >
          {post.content}
        </div>

        {/* 오버플로우일 때만 버튼 노출 */}
        {isOverflowing && (
          <button
            type="button"
            className={styles.moreText}
            onClick={() => setShowFullContent((v) => !v)}
          >
            {showFullContent ? "접기" : "더보기"}
          </button>
        )}
      </div>

      {/* 옵션 모달창 */}
      <PostOptionModal
        isOpen={isOpenOption}
        postId={post.id}
        onClose={() => closeOption()}
      />

      {/* 게시글 상세 모달창 */}
      <PostDetailModal
        isOpen={isOpenDetail}
        postId={post.id}
        onClose={() => closeDetail()}
      />
    </div>
  );
};

export default PostItem;
