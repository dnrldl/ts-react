import { useInfiniteQuery } from "@tanstack/react-query";
import { Page } from "types/common";
import { PostCondition } from "types/post";
import { Post } from "types/type";

type PostsParam = {
  isLoggedIn: boolean;
  postCond: PostCondition;

  fetchPostPage: (cond: PostCondition) => Promise<Page<Post>>;
};

export const usePosts = ({
  isLoggedIn,
  postCond,
  fetchPostPage,
}: PostsParam) => {
  return useInfiniteQuery({
    queryKey: ["posts", isLoggedIn, postCond],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) => {
      const cond = { ...postCond, page: pageParam };
      return fetchPostPage(cond);
    },
    initialPageParam: 0,
    getNextPageParam: (latestPage) =>
      latestPage.last ? undefined : latestPage.page + 1,
  });
};
