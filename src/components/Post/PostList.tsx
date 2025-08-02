import PostItem from "components/Post/PostItem";
import { Post } from "types/type";
import styles from "./PostList.module.scss";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <div className={styles.container}>
      {posts.map((item) => {
        return <PostItem key={item.id} post={item} />;
      })}
    </div>
  );
};

export default PostList;
