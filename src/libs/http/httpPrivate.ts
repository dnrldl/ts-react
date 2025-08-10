import { createHttpClient } from "./httpFactory";
import { useAuthStore } from "store/useAuthStore";
import { ApiResponse } from "types/api";
import { refresh } from "./httpPublic";

const axiosInstance = createHttpClient(true);

// (1) refresh 폭주 방지(동시 401 한 번만 처리)
let refreshPromise: Promise<string> | null = null;
const EXCLUDE_REFRESH = ["/auth/login", "/auth/register", "/auth/refresh"];

async function getFreshToken() {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const newAccessToken = await refresh(); // ⬅️ 네가 만든 refresh() 호출
      localStorage.setItem("accessToken", newAccessToken);
      useAuthStore.getState().setAccessToken(newAccessToken);
      console.log("Refresh Token Succeeded!");
      return newAccessToken;
    })().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

// 401 응답 시 refresh 후 재시도
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config ?? {};
    const url = originalRequest.url ?? "";

    const shouldTryRefresh =
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !EXCLUDE_REFRESH.some((p) => url.includes(p));

    if (!shouldTryRefresh) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await getFreshToken();
      originalRequest.headers = {
        ...(originalRequest.headers ?? {}),
        Authorization: `Bearer ${newAccessToken}`,
      };
      return axiosInstance(originalRequest); // 실패했던 요청 재시도
    } catch (e) {
      console.error("Refresh Token Failed!");
      useAuthStore.getState().clear();
      localStorage.removeItem("accessToken");
      return Promise.reject(e);
    }
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
