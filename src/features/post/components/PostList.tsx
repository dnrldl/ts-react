import { Post } from "shared/types/type";
import styles from "./PostList.module.scss";
import PostItem from "features/post/components/PostItem";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => (
  <div className={styles.container}>
    {posts.map((post) => {
      return <PostItem key={post.id} post={post} />;
    })}
  </div>
);
export default PostList;
