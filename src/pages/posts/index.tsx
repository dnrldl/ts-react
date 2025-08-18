import { getPostPage, getPublicPostPage } from "api/posts";
import clsx from "clsx";
import Container from "components/Container";
import Loading from "components/Loading";
import PostList from "components/Post/PostList";
import Button from "components/ui/Button/Button";
import { Option } from "components/ui/Dropdown/Dropdown";
import { usePosts } from "hooks/post/usePosts";
import { Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import { PostCondition, SortByOption } from "types/post";
import { Post } from "types/type";
import styles from "./PostPage.module.scss";

const sortOptions: Option<SortByOption>[] = [
  { label: "최신순", value: "createdAt" },
  { label: "댓글순", value: "commentCount" },
  { label: "좋아요순", value: "likeCount" },
];

const PostPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // 스크롤 ref
  const [postCond, setPostCond] = useState<PostCondition>({
    // 게시글 검색 조건
    page: 0,
    size: 10,
    sortBy: "createdAt",
    direction: "desc",
  });
  const fetchPostPage = isLoggedIn ? getPostPage : getPublicPostPage;
  const {
    data,
    status, // 'pending' | 'error' | 'success'
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = usePosts({ isLoggedIn, postCond, fetchPostPage });

  // useInfiniteQuery는 결과를 2차원 배열로 반환하기 때문에
  // flatMap으로 1차원 배열로 변환
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
  if (status === "error")
    return <div>에러 발생: {(error as Error).message}</div>;

  return (
    <Container
      title="Posts"
      rightSlot={
        <Button onClick={() => navigate("/posts/add")}>
          <Plus />
        </Button>
      }
    >
      <div className={clsx(styles.header)}></div>

      {/* 게시글 리스트 */}
      <PostList posts={flatPosts} />

      {/* 마지막 페이지 */}
      {!hasNextPage ? (
        <div className={styles.end}>Last Page!</div>
      ) : (
        <div ref={loadMoreRef} style={{ height: 32 }} />
      )}
    </Container>
  );
};

export default PostPage;
