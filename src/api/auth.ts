import { http } from "libs/http";
import { RegisterRequest } from "types/api";

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
};
type RefreshResponse = Omit<LoginResponse, "refreshToken">;

export const login = (form: { email: string; password: string }) =>
  http.post<LoginResponse>("/auth/login", form);

export const register = (form: RegisterRequest) =>
  http.post<string>("/users/register", form);

export const refresh = () =>
  http.post<RefreshResponse>(
    "/auth/reissue",
    {},
    {
      withCredentials: true,
    }
  );
