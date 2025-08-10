import { useMutation, useQueryClient } from "@tanstack/react-query";
import { privateHttp } from "libs/http/httpPrivate";
import { Post } from "types/type";

export const postKeys = {
  all: ["posts"] as const,
  list: (p: { page: number; q?: string }) => ["posts", p] as const,
  detail: (id: number) => ["post", id] as const,
};

async function toggleLike(id: number) {
  const r = await privateHttp.post(`/api/posts/${id}/like`);
  return r as { likes: number };
}

export function useToggleLike(id: number) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => toggleLike(id),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: postKeys.detail(id) });
      const prev = qc.getQueryData<Post>(postKeys.detail(id));
      // 낙관적 증가
      if (prev)
        qc.setQueryData(postKeys.detail(id), {
          ...prev,
          likeCount: prev.likeCount + 1,
        });
      return { prev };
    },
    onError: (_err, _v, ctx) => {
      // 롤백
      if (ctx?.prev) qc.setQueryData(postKeys.detail(id), ctx.prev);
    },
    onSettled: () => {
      // 진짜 값 동기화
      qc.invalidateQueries({ queryKey: postKeys.detail(id) });
      qc.invalidateQueries({ queryKey: postKeys.all }); // 목록들도 최신화
    },
  });
}
