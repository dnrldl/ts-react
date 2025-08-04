import { useQuery } from "@tanstack/react-query";
import { getComments } from "api/comments";
import CommentItem from "components/Comment/CommentItem";
import LoadingSkeleton from "components/Loading/LoadingSkeleton";
import { useEffect } from "react";

interface CommentListProps {
  postId: number;
  setCommentCount: (count: number) => void;
}

const CommentList = ({ postId, setCommentCount }: CommentListProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(String(postId)),
  });

  useEffect(() => {
    if (data) {
      setCommentCount(data.data.length);
    }
  }, [data, setCommentCount]);

  if (isLoading) return <LoadingSkeleton />;
  if (!data) return null;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      {data.data.map((item) => {
        return <CommentItem key={item.id} comment={item} />;
      })}
    </div>
  );
};

export default CommentList;
