import { Post } from "types/type";
import { create } from "zustand";

interface PostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
}

const usePostStore = create<PostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) =>
    set((state) => ({
      posts: [post, ...state.posts],
    })),
}));

export default usePostStore;
