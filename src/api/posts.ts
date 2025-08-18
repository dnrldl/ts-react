import { privateHttp } from "libs/http/httpPrivate";
import { publicHttp } from "libs/http/httpPublic";
import { Page } from "types/common";
import { PostCondition } from "types/post";
import { Post } from "types/type";

export type ImageRegisterRequest = {
  storageKey: string;
  url: string;
  width?: number;
  height?: number;
  bytes?: number;
  mimeType?: string;
  orderIndex: number;
  isThumbnail: boolean;
};

export const getPublicPostPage = (cond: PostCondition) => {
  let uri = `/posts?page=${cond.page}&size=${cond.size}`;
  if (cond.sortBy) uri += "&sortBy=" + cond.sortBy;
  if (cond.direction) uri += "&direction=" + cond.direction;

  return publicHttp.get<Page<Post>>(uri);
};

export const getPostPage = (cond: PostCondition) => {
  let uri = `/posts?page=${cond.page}&size=${cond.size}`;
  if (cond.sortBy) uri += "&sortBy=" + cond.sortBy;
  if (cond.direction) uri += "&direction=" + cond.direction;

  return privateHttp.get<Page<Post>>(uri);
};

export const likePost = (postId: number) =>
  privateHttp.post<void>(`/posts/${postId}/like`);

export const unlikePost = (postId: number) =>
  privateHttp.post<void>(`/posts/${postId}/unlike`);

export const getPostDetail = (postId: number) =>
  publicHttp.get<Post>(`/posts/${postId}`);

export const createPost = (body: string) =>
  privateHttp.post<number>(`/posts`, body);

// post image
export const registerPostImage = (
  postId: number,
  payload: ImageRegisterRequest[]
) => {
  if (typeof postId !== "number") throw new Error("postId is required");
  return privateHttp.post<void>(`/posts/${postId}/images/register`, payload);
};
