import { http } from "libs/http";
import { Page } from "types/common";
import { Post } from "types/type";

export const getPostPage = (page = 0, size = 10) =>
  http.get<Page<Post>>(`/posts?page=${page}&size=${size}`);

export const getPostDetail = (postId: string) =>
  http.get<Post>(`/posts/${postId}`);

export const createPost = (body: { content: string }) =>
  http.post<number>(`/posts`, body);
