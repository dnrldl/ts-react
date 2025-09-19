import styles from "./CommentSection.module.scss";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "api/comments";
import CommentEditor from "features/comment/components/CommentEditor";
import CommentList from "features/comment/components/CommentList";
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
    <div className={styles.container}>
      <div className={styles.list}>
        <CommentList
          postId={postId}
          setCommentCount={setCommentCount}
          refetchKey={refetchKey}
        />
      </div>

      <div className={styles.editor}>
        <CommentEditor
          onSubmit={handleCreateComment}
          isLoading={commentMutation.isPending}
        />
      </div>
    </div>
  );
};

export default memo(CommentSection);
