import { useQuery } from "@tanstack/react-query";
import { getComments } from "api/comments";
import CommentItem from "components/Comment/CommentItem";
import LoadingSkeleton from "components/Loading/LoadingSkeleton";
import { useEffect } from "react";

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
  });

  useEffect(() => {
    if (comments) {
      setCommentCount(comments.length);
    }
  }, [comments, setCommentCount]);

  if (isLoading) return <LoadingSkeleton />;
  if (!comments) return null;
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
