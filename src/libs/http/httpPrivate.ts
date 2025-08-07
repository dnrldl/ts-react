import { createHttpClient } from "./httpFactory";
import { useAuthStore } from "store/useAuthStore";
import { ApiResponse } from "types/api";

const axiosInstance = createHttpClient(true);

// 401 응답 시 refresh 요청 후 재시도
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { refresh } = await import("./httpPublic"); // 순환 참조 방지
        const newAccessToken = await refresh();

        localStorage.setItem("accessToken", newAccessToken);
        useAuthStore.getState().setAccessToken(newAccessToken);
        console.log("Refresh Token Successed!");

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clear();
        localStorage.removeItem("accessToken");
        console.error("Refresh Token Faild!");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const privateHttp = {
  get: async <T>(url: string, config = {}) => {
    const res = await axiosInstance.get<ApiResponse<T>>(url, config);
    return res.data.data;
  },
  post: async <T>(url: string, body?: any, config = {}) => {
    const res = await axiosInstance.post<ApiResponse<T>>(url, body, config);
    return res.data.data;
  },
  put: async <T>(url: string, body?: any, config = {}) => {
    const res = await axiosInstance.put<ApiResponse<T>>(url, body, config);
    return res.data.data;
  },
  delete: async <T>(url: string, config = {}) => {
    const res = await axiosInstance.delete<ApiResponse<T>>(url, config);
    return res.data.data;
  },
};
