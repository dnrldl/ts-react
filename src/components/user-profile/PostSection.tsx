import { getPostPage } from "api/posts";
import Loading from "components/Loading";
import PostList from "components/Post/PostList";
import { usePosts } from "hooks/post/usePosts";
import { useEffect, useMemo, useRef, useState } from "react";
import { PostCondition } from "types/post";
import { Post } from "types/type";
import styles from "../Comment/CommentEditor.module.scss";

const PostSection = () => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const [postCond, setPostCond] = useState<PostCondition>({
    page: 0,
    size: 10,
    mineOnly: true,
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
  } = usePosts({ isLoggedIn: true, postCond, fetchPostPage: getPostPage });

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

  if (status === "pending") return <Loading />;
  if (status === "error")
    return <div>에러 발생: {(error as Error).message}</div>;

  return (
    <div>
      <h3>My Posts</h3>
      <PostList posts={flatPosts} />

      {/* 마지막 페이지 */}
      {!hasNextPage ? (
        <div className={styles.end}>Last Page!</div>
      ) : (
        <div ref={loadMoreRef} style={{ height: 32 }} />
      )}
    </div>
  );
};

export default PostSection;
