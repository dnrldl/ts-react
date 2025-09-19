import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { refreshAccessTokenApi } from "features/auth/api/api";
import type { ApiSuccessResponse } from "shared/axios/types/api";
import { useAccessTokenStore } from "shared/stores/accessTokenStore";

const BASE_URL = process.env.REACT_APP_API_URL ?? "http://localhost:8080";

export const http = axios.create({
  baseURL: BASE_URL + "/api",
  withCredentials: true,
});

/**
 * 요청 인터셉터
 *
 * 토큰이 있으면 헤더에 추가후 요청
 */
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAccessTokenStore.getState().token;
    console.log("api요청시 accessToken", accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터
 *
 * 401 응답시 토큰 갱신 후 다시 요청 시도
 */
http.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const config: any = error.config;

    // refresh 요청 자체가 401이면 무한루프 방지
    if (config?.url?.includes("/auth/refresh")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !config?._retry) {
      config._retry = true;
      try {
        const accessToken = await refreshAccessTokenApi(); // 네트워크만
        useAccessTokenStore.getState().setToken(accessToken); // ← 여기서 전역 업데이트

        // 재시도 요청에 새 토큰 부착
        config.headers = {
          ...(config.headers || {}),
          Authorization: `Bearer ${accessToken}`,
        };
        return http.request(config);
      } catch (e) {
        useAccessTokenStore.getState().clearToken();
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

// 얇은 래퍼: 항상 성공 타입만 반환
export const axiosInstance = {
  get: async <T>(url: string, config: AxiosRequestConfig = {}) => {
    const res = await http.get<ApiSuccessResponse<T>>(url, config);
    return res.data.data;
  },
  post: async <T>(url: string, body?: any, config: AxiosRequestConfig = {}) => {
    const res = await http.post<ApiSuccessResponse<T>>(url, body, config);
    return res.data.data;
  },
  put: async <T>(url: string, body?: any, config: AxiosRequestConfig = {}) => {
    const res = await http.put<ApiSuccessResponse<T>>(url, body, config);
    return res.data.data;
  },
  delete: async <T>(url: string, config: AxiosRequestConfig = {}) => {
    const res = await http.delete<ApiSuccessResponse<T>>(url, config);
    return res.data.data;
  },
};
