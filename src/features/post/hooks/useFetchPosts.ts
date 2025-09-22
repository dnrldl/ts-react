import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "features/auth/hooks/useAuth";
import { fetchPostsApi } from "features/post/api/api";
import { PostCondition, Post, SortByOption } from "features/post/types";
import { useState, useRef, useMemo, useEffect } from "react";
import { toast } from "sonner";

export const useFetchPosts = () => {
  const { isLoggedIn } = useAuth();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // 스크롤 ref
  const [postCond, setPostCond] = useState<PostCondition>({
    // 게시글 검색 조건
    page: 0,
    size: 10,
    sortBy: "createdAt",
    direction: "desc",
  });

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
      return fetchPostsApi(cond);
    },
    initialPageParam: 0,
    getNextPageParam: (latestPage) =>
      latestPage.last ? undefined : latestPage.page + 1,
  });

  // useInfiniteQuery의 반환값은 2차원 배열
  // 2차원 배열 -> 1차원 배열로 변환
  const flatPosts: Post[] = useMemo(
    () => data?.pages.flatMap((p) => p.content) ?? [],
    [data]
  );

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const loadRef = loadMoreRef.current;
    if (!loadRef) return;

    // 스크롤이 마지막에 닿았을 때 다음 페이지 로드
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && fetchNextPage(),
      { threshold: 0.1 }
    );

    // observe 활성화 (감시)
    io.observe(loadRef);
    // 언마운트 시 observe 비활성화
    return () => io.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 정렬조건 핸들러
  const onChangeSort = (v: SortByOption) => {
    setPostCond((prev) => ({ ...prev, sortBy: v }));
  };

  const handleClickCreate = () => {
    // navigate("/posts/add")
    if (!isLoggedIn) {
      toast.info("Require Login!");
      return;
    }
    setIsOpen(true);
  };

  return {
    flatPosts,
    onChangeSort,
    handleClickCreate,
    status,
    error,
    hasNextPage,
    loadMoreRef,
    isOpen,
    setIsOpen,
  };
};
