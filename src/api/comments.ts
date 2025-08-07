import { privateHttp } from "libs/http/httpPrivate";
import { publicHttp } from "libs/http/httpPublic";
import { Comment } from "types/type";

type CreateComment = { postId: number; content: string };

export const getComments = (postId: number) =>
  publicHttp.get<Comment[]>(`/posts/${postId}/comments`);

export const createComment = ({ postId, content }: CreateComment) =>
  privateHttp.post(`/posts/${postId}/comments`, { content });
