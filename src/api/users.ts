import { privateHttp } from "libs/http/httpPrivate";
import { publicHttp } from "libs/http/httpPublic";
import { User } from "types/user";

export const getPublicUserProfile = (userId: number) =>
  publicHttp.get<User>(`/users/${userId}`);

export const getMyProfile = () => privateHttp.get<User>("/users/me");
