import { useInfiniteQuery } from "@tanstack/react-query";
import { Post, PostCondition } from "features/post/types";
import { Page } from "shared/types/common";

export const usePosts = (
  postCond: PostCondition,
  fetchData: (cond: PostCondition) => Promise<Page<Post>>
) => {
  const {
    data,
    status, // 'pending' | 'error' | 'success'
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", postCond],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) => {
      const cond = { ...postCond, page: pageParam };
      return fetchData(cond);
    },
    initialPageParam: 0,
    getNextPageParam: (latestPage) =>
      latestPage.last ? undefined : latestPage.page + 1,
  });

  return {
    data,
    status, // 'pending' | 'error' | 'success'
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};
