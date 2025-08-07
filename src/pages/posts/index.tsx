import clsx from "clsx";
import styles from "./PostPage.module.scss";
import Container from "components/Container";
import Loading from "components/Loading";
import PostList from "components/Post/PostList";
import Button from "components/ui/Button/Button";
import { useEffect, useState } from "react";
import { Post } from "types/type";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostPage, getPublicPostPage } from "api/posts";
import { useAuthStore } from "store/useAuthStore";
import { PageInfo } from "types/common";
import { postCondition } from "types/post";

const PostPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const [posts, setPosts] = useState<Post[]>([]);

  const [pageCond, setPageCond] = useState<postCondition>({
    page: 0,
    size: 10,
    sortBy: "",
    direction: "",
  });

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  const {
    data: postRes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", pageInfo.page],
    queryFn: () =>
      isLoggedIn ? getPostPage(pageCond) : getPublicPostPage(pageCond),
  });

  // 응답 값이 바뀌면 게시글, 페이지 정보 세팅
  useEffect(() => {
    if (postRes) {
      setPosts(postRes.content);
      setPageInfo({
        page: postRes.page,
        size: postRes.size,
        totalElements: postRes.totalElements,
        totalPages: postRes.totalPages,
      });

      setPageCond((prev) => ({
        ...prev,
        page: postRes.page,
        size: postRes.size,
      }));
    }
  }, [postRes]);

  const handleClickAdd = () => {
    navigate("/posts/add");
  };

  if (isLoading) return <Loading />;
  if (!postRes) return null;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <Container>
      <div className={clsx(styles.header, "mb-header")}>
        <h1>Posts</h1>
        <Button onClick={handleClickAdd}>New</Button>
      </div>
      <PostList posts={posts} />
    </Container>
  );
};

export default PostPage;
