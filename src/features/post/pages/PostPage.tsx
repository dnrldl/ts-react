import clsx from "clsx";
import Loading from "shared/components/loading/Loading";
import { Option } from "shared/components/ui/Dropdown/Dropdown";
import { fetchPostsApi } from "features/post/api/api";
import { usePosts } from "features/post/hooks/usePosts";
import PostAddModal from "features/post/components/AddPostModal";
import { useEffect, useMemo, useRef, useState } from "react";

import { Post } from "shared/types/type";
import styles from "./PostPage.module.scss";
import { SortByOption, PostCondition } from "features/post/types";
import PostList from "features/post/components/PostList";

const sortOptions: Option<SortByOption>[] = [
  { label: "최신순", value: "createdAt" },
  { label: "댓글순", value: "commentCount" },
  { label: "좋아요순", value: "likeCount" },
];

const PostPage = () => {
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
  } = usePosts(postCond, fetchPostsApi);

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

  if (status === "pending") return <Loading />;
  if (status === "error") return <div>에러 발생: {error?.name}</div>;

  const handleClickCreate = () => {
    // navigate("/posts/add")
    setIsOpen(true);
  };

  return (
    <div>
      <div className={clsx(styles.header)}>
        <button onClick={handleClickCreate}>create</button>
      </div>

      {/* 게시글 리스트 */}
      <PostList posts={flatPosts} />

      {/* 마지막 페이지 */}
      {!hasNextPage ? (
        <div className={styles.end}>Last Page!</div>
      ) : (
        <div ref={loadMoreRef} style={{ height: 32 }} />
      )}

      <PostAddModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default PostPage;
