import styles from "./CommentList.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getComments } from "api/comments";
import clsx from "clsx";
import LoadingSkeleton from "shared/components/loading/LoadingSkeleton";
import { useEffect } from "react";
import CommentItem from "features/comment/components/CommentItem";

interface CommentListProps {
  postId: number;
  setCommentCount: (count: number) => void;
  refetchKey?: number;
}

const CommentList = ({
  postId,
  setCommentCount,
  refetchKey,
}: CommentListProps) => {
  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", postId, refetchKey],
    queryFn: () => getComments(postId),
    gcTime: 5_000,
  });

  useEffect(() => {
    if (comments) {
      setCommentCount(comments.length);
    }
  }, [comments, setCommentCount]);

  if (isLoading) return <LoadingSkeleton />;
  if (!comments?.length)
    return (
      <div className={clsx("center", styles.noComments)}>No comments!</div>
    );
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      {comments.map((item) => {
        return <CommentItem key={item.id} comment={item} />;
      })}
    </div>
  );
};

export default CommentList;
