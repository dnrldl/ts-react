import { createHttpClient } from "./httpFactory";
import { ApiResponse } from "types/api";

const axiosInstance = createHttpClient(false);

export const publicHttp = {
  get: async <T>(url: string, config = {}) => {
    const res = await axiosInstance.get<ApiResponse<T>>(url, config);
    return res.data.data;
  },
  post: async <T>(url: string, body?: any, config = {}) => {
    const res = await axiosInstance.post<ApiResponse<T>>(url, body, config);
    return res.data.data;
  },
};

// refresh 전용 함수 (순환 참조 방지용 분리)
export const refresh = async (): Promise<string> => {
  const res = await axiosInstance.post<ApiResponse<string>>("/auth/reissue");
  return res.data.data;
};
