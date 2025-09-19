import { axiosInstance } from "shared/axios/axiosInstance";
import { Comment } from "shared/types/type";

type CreateComment = { postId: number; content: string };

export const getComments = (postId: number) =>
  axiosInstance.get<Comment[]>(`/posts/${postId}/comments`);

export const createComment = ({ postId, content }: CreateComment) =>
  axiosInstance.post(`/posts/${postId}/comments`, { content });
