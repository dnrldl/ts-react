import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePost, unlikePost } from "api/posts";
import clsx from "clsx";
import PostImages from "components/Post/PostImages";
import PostOptionModal from "components/Post/PostOptionModal";
import { Ellipsis, Heart, MessageCircle } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "store/useAuthStore";
import { Post } from "types/type";
import { getAgoTime } from "utils/dateUtils";
import styles from "./PostItem.module.scss";

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  const idLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked);
  const [likeCount, setLikeCount] = useState<number>(post.likeCount);
  const [showFullContent, setShowFullContent] = useState<boolean>(false);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const qc = useQueryClient();

  const likeMutate = useMutation({
    mutationKey: ["likePost", post.id],
    mutationFn: () => likePost(post.id),
    retry: 0,
    onMutate: async () => {
      // 요청하기전에 우선 상태 변경
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);

      await qc.cancelQueries({ queryKey: ["likePost"] });
      const previous = qc.getQueryData(["likePost"]);

      return { previous };
    },
    onSuccess: () => {
      toast.success("Post liked successfully!");
    },
    onError: (err, _, context) => {
      // 실패했을 때
      const errorCode = (err as any)?.response?.data?.code;
      if (errorCode === "PL002") {
        // 이미 좋아요 처리 된 경우
        toast.info("You have already liked this post!");
        return;
      }

      qc.setQueryData(["likePost"], context?.previous);
      setIsLiked(false);
      setLikeCount((prev) => Math.max(prev - 1, 0));
      toast.error("Failed to like post!");
    },
  });

  const unlikeMutate = useMutation({
    mutationKey: ["unlikePost", post.id],
    mutationFn: () => unlikePost(post.id),
    onMutate: async () => {
      setIsLiked(false);
      setLikeCount((prev) => Math.max(prev - 1, 0));
      await qc.cancelQueries({ queryKey: ["unlikePost"] });
      const previous = qc.getQueryData(["unlikePost"]);

      return { previous };
    },
    onSuccess: () => {
      toast.success("Post unliked successfully!");
    },
    onError: (err, _, context) => {
      const errorCode = (err as any)?.response?.data?.code;
      if (errorCode === "PL001") {
        // 이미 좋아요 취소 처리 된 경우
        toast.info("You have already unliked this post!");
        return;
      }

      qc.setQueryData(["unlikePost"], context?.previous);
      setIsLiked(true);
      setLikeCount((prev) => prev + 1);
      toast.error("Failed to unlike post!");
    },
  });

  const handleClickLike = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!idLoggedIn) {
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

    const check = () => {
      // 약간의 오차 보정(+1)
      setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
    };

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
            setIsOpenModal(true);
          }}
          className={styles.ellipsis}
        >
          <Ellipsis size={14} />
        </div>
      </div>

      {/* 이미지 */}
      <div>
        <PostImages urls={post.thumbnailUrl ? [post.thumbnailUrl] : []} />
      </div>

      {/* 좋아요, 댓글수 등등 */}
      <div className={styles.actionWrapper}>
        <span onClick={handleClickLike} className={styles.action}>
          {isLiked ? <Heart fill="red" color="red" /> : <Heart />}
          {likeCount}
        </span>
        <span className={styles.action}>
          <Link to={String(post.id)}>
            <MessageCircle />
          </Link>
          {post.commentCount}
        </span>
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

      <PostOptionModal
        isOpen={isOpenModal}
        postId={post.id}
        onClose={() => {
          setIsOpenModal(false);
        }}
      />
    </div>
  );
};

export default PostItem;
