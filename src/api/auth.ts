import { http } from "libs/http";
import { RegisterRequest } from "types/api";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};

export const login = (form: { email: string; password: string }) =>
  http.post<LoginResponse>("/auth/login", form);

export const register = (form: RegisterRequest) =>
  http.post<string>("/users/register", form);

export const refresh = () =>
  http.post<Omit<LoginResponse, "refreshToken">>("/auth/reissue", null, {
    withCredentials: true,
  });
