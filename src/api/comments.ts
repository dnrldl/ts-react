import { http } from "libs/http";
import { Comment } from "types/type";

export const getComments = (postId: string) =>
  http.get<Comment[]>(`/posts/${postId}/comments`);
