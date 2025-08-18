import PostItem from "components/Post/PostItem";
import { Post } from "types/type";
import styles from "./PostList.module.scss";

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
