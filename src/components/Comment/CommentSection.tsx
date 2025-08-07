import { useMutation } from "@tanstack/react-query";
import { createComment } from "api/comments";
import CommentEditor from "components/Comment/CommentEditor";
import CommentList from "components/Comment/CommentList";
import { memo, useCallback, useState } from "react";
import { toast } from "sonner";

interface CommentSectionProps {
  postId: number;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const [commentCount, setCommentCount] = useState<number>(0);
  const [refetchKey, setRefetchKey] = useState(0); // 렌더링용

  const commentMutation = useMutation({
    mutationFn: (content: string) =>
      createComment({ postId: postId!, content }),
    onSuccess: () => {
      toast.success("댓글이 등록되었습니다.");
      setRefetchKey((prev) => prev + 1);
    },
    onError: () => {
      toast.error("댓글 등록에 실패했습니다.");
    },
  });

  const handleCreateComment = useCallback(
    (content: string) => {
      commentMutation.mutate(content);
    },
    [commentMutation]
  );

  return (
    <>
      <h2 className="mb-header-22">{commentCount} Comments</h2>
      <CommentEditor
        onSubmit={handleCreateComment}
        isLoading={commentMutation.isPending}
      />
      <CommentList
        postId={postId}
        setCommentCount={setCommentCount}
        refetchKey={refetchKey}
      />
    </>
  );
};

export default memo(CommentSection);
