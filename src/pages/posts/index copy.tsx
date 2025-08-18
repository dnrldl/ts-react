import { getPostPage, getPublicPostPage } from "api/posts";
import clsx from "clsx";
import Container from "components/Container";
import Loading from "components/Loading";
import PostList from "components/Post/PostList";
import Button from "components/ui/Button/Button";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "store/useAuthStore";
import { PostCondition } from "types/post";
import { Post } from "types/type";
import styles from "./PostPage.module.scss";

const PostPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [cond, setCond] = useState<PostCondition>({
    page: 0,
    size: 10,
    sortBy: "createdAt",
    direction: "desc",
  });

  const fetchPosts = useCallback(
    (c: PostCondition) => (isLoggedIn ? getPostPage(c) : getPublicPostPage(c)),
    [isLoggedIn]
  );

  const loadMorePosts = useCallback(async () => {
    if (isLoading || isLastPage) return;
    setIsLoading(true);
    try {
      const nextPage = { ...cond, page: cond.page + 1 };
      setCond(nextPage);
      const response = await fetchPosts(nextPage);
      setPosts((prev) => [...prev, ...response.content]);
      setIsLastPage(!!response.last);
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  }, [cond, fetchPosts, isLoading, isLastPage]);

  useEffect(() => {
    const initPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetchPosts(cond);
        setPosts(response.content);
        setIsLastPage(!!response.last);
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsLoading(false);
      }
    };

    initPosts();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <Container
      title="Posts"
      rightSlot={<Button onClick={() => navigate("/posts/add")}>Add</Button>}
    >
      <div className={clsx(styles.header)}></div>

      {/* 게시글 리스트 */}
      <PostList posts={posts} />

      {/* 마지막 페이지 */}
      {isLastPage ? (
        <div>Last Page!</div>
      ) : (
        <button onClick={loadMorePosts}>Load More</button>
      )}
    </Container>
  );
};

export default PostPage;
