import { privateHttp } from "libs/http/httpPrivate";
import { publicHttp } from "libs/http/httpPublic";
import { RegisterRequest } from "types/auth";

type LoginResponse = {
  accessToken: string;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  role: string;
};

export const login = (form: { email: string; password: string }) =>
  publicHttp.post<LoginResponse>("/auth/login", form);

export const logout = () => privateHttp.post("/auth/logout");

export const register = (form: RegisterRequest) =>
  publicHttp.post<string>("/users/register", form);
