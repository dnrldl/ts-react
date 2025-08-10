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
      toast.success("Comment Post Success!");
      setRefetchKey((prev) => prev + 1);
    },
    onError: () => {
      toast.error("Comment Post Failed!");
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
