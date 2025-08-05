import { refresh } from "api/auth";
import axios from "axios";
import { useAuthStore } from "store/useAuthStore";
import { ApiResponse } from "types/api";

const BASE_URL = process.env.REACT_APP_API_URL + "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 시 AccessToken 추가
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 에러 시 AccessToken 재발급 & 재요청
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await refresh();
        const newAccessToken = refreshRes.data.accessToken;

        console.log(newAccessToken);

        useAuthStore.getState().setAccessToken(newAccessToken);
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.warn("Token refresh failed", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const http = {
  get: async <T>(url: string, config = {}) => {
    const res = await axiosInstance.get<ApiResponse<T>>(url, config);
    return res.data;
  },

  post: async <T>(url: string, body?: any, config = {}) => {
    const res = await axiosInstance.post<ApiResponse<T>>(url, body, config);
    return res.data;
  },

  put: async <T>(url: string, body?: any, config = {}) => {
    const res = await axiosInstance.put<ApiResponse<T>>(url, body, config);
    return res.data;
  },

  delete: async <T>(url: string, config = {}) => {
    const res = await axiosInstance.delete<ApiResponse<T>>(url, config);
    return res.data;
  },
};
