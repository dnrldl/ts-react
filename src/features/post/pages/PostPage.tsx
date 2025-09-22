import clsx from "clsx";
import PostAddModal from "features/post/components/AddPostModal";

import PostList from "features/post/components/PostList";
import { useFetchPosts } from "features/post/hooks/useFetchPosts";
import Loading from "shared/components/loading/Loading";
import styles from "./PostPage.module.scss";
import Container from "shared/layouts/container";

const PostPage = () => {
  const {
    flatPosts,
    handleClickCreate,
    status,
    error,
    hasNextPage,
    loadMoreRef,
    isOpen,
    setIsOpen,
  } = useFetchPosts();

  if (status === "pending") return <Loading />;
  if (error) return <div>{error.message}</div>;

  return (
    <Container
      rightSlot={
        <div className={clsx(styles.header)}>
          <button onClick={handleClickCreate}>create</button>
        </div>
      }
    >
      {/* 게시글 리스트 */}
      <PostList posts={flatPosts} />

      {/* 마지막 페이지 */}
      {!hasNextPage ? (
        <div className={styles.end}>Last Page!</div>
      ) : (
        <div ref={loadMoreRef} style={{ height: 32 }} />
      )}

      <PostAddModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Container>
  );
};

export default PostPage;
