import { http } from "libs/http";
import { Comment } from "types/type";

type CreateComment = { postId: string; content: string };

export const getComments = (postId: string) =>
  http.get<Comment[]>(`/posts/${postId}/comments`);

export const createComment = ({ postId, content }: CreateComment) =>
  http.post(`/posts/${postId}/comments`, { content });
