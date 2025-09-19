import { axiosInstance, http } from "shared/axios/axiosInstance";
import {
  LoginFormData,
  LoginResponse,
  RegisterFormData,
} from "features/auth/types";
import { authEndpoints } from "features/auth/api/endpoints";
import { ApiSuccessResponse } from "shared/axios/types/api";

export const loginApi = async (data?: LoginFormData) =>
  axiosInstance.post<LoginResponse>(authEndpoints.login.path, data);

export const logoutApi = async () =>
  axiosInstance.post<void>(authEndpoints.logout.path);

export const registerApi = async (
  data?: Omit<RegisterFormData, "confirmPassword">
) => axiosInstance.post<{ email: string }>(authEndpoints.register.path, data);

export const refreshAccessTokenApi = async () => {
  const response = await http.post<ApiSuccessResponse<string>>(
    authEndpoints.refresh.path
  );
  return response.data.data;
};

export const authMe = async () =>
  axiosInstance.get<Omit<LoginResponse, "accessToken">>(authEndpoints.me.path);
