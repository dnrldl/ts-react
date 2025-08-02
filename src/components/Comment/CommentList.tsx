import CommentItem from "components/Comment/CommentItem";
import LoadingSkeleton from "components/Loading/LoadingSkeleton";
import { useFetch } from "hooks/useFetch";
import { useEffect } from "react";
import { Comment } from "types/type";

interface CommentListProps {
  postId: number;
  setCommentCount: (count: number) => void;
}

const CommentList = ({ postId, setCommentCount }: CommentListProps) => {
  const { data, loading, error } = useFetch<Comment[]>(
    `/posts/${postId}/comments`
  );

  useEffect(() => {
    if (data) {
      setCommentCount(data.length);
    }
  }, [data, setCommentCount]);

  if (loading) return <LoadingSkeleton />;
  if (!data) return null;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div>
      {data.map((item) => {
        return <CommentItem key={item.id} comment={item} />;
      })}
    </div>
  );
};

export default CommentList;
