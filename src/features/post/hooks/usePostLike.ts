import { QueryClient, useMutation } from "@tanstack/react-query";
import { likePostApi, unlikePostApi } from "features/post/api/api";
import { toast } from "sonner";

type MutateParams = {
  postId: number;
  setIsLiked: React.Dispatch<React.SetStateAction<boolean>>;
  setLikeCount: React.Dispatch<React.SetStateAction<number>>;
  qc: QueryClient;
};

const usePostLike = ({
  postId,
  setIsLiked,
  setLikeCount,
  qc,
}: MutateParams) => {
  const likeMutate = useMutation({
    mutationKey: ["likePost", postId],
    mutationFn: () => likePostApi(postId),
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
    mutationKey: ["unlikePost", postId],
    mutationFn: () => unlikePostApi(postId),
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

  return { likeMutate, unlikeMutate };
};

export default usePostLike;
