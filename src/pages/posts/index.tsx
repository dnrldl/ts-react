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
import { getPostPage } from "api/posts";

const PostPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  // const { data, loading, error } = useFetch<Page<Post>>("/posts");
  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPostPage(0, 10),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (data) setPosts(data.data.content);
  }, [setPosts, data]);

  const handleClickAdd = () => {
    navigate("/posts/add");
  };

  if (isLoading) return <Loading />;
  if (!data) return null;
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
