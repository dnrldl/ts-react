import { privateHttp } from "libs/http/httpPrivate";
import { publicHttp } from "libs/http/httpPublic";
import { Page } from "types/common";
import { postCondition } from "types/post";
import { Post } from "types/type";

export const getPublicPostPage = (cond: postCondition) => {
  let uri = `/posts?page=${cond.page}&size=${cond.size}`;
  if (cond.sortBy) uri += "&sortBy=" + cond.sortBy;
  if (cond.direction) uri += "&direction=" + cond.direction;

  return publicHttp.get<Page<Post>>(uri);
};

export const getPostPage = (cond: postCondition) => {
  let uri = `/posts?page=${cond.page}&size=${cond.size}`;
  if (cond.sortBy) uri += "&sortBy=" + cond.sortBy;
  if (cond.direction) uri += "&direction=" + cond.direction;

  return privateHttp.get<Page<Post>>(uri);
};

export const getPostDetail = (postId: string) =>
  publicHttp.get<Post>(`/posts/${postId}`);

export const createPost = (body: { content: string }) =>
  privateHttp.post<number>(`/posts`, body);
