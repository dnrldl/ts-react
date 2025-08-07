import axios from "axios";
import { useAuthStore } from "store/useAuthStore";
import { publicAxios } from "./publicAxios";
import { getAccessToken, setAccessToken, clearTokens } from "utils/tokenUtils";

const privateAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL + "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

privateAxios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

privateAxios.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await publicAxios.post(
          "/auth/reissue",
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.data;

        setAccessToken(newAccessToken); // localstorage
        useAuthStore.getState().setAccessToken(newAccessToken); // zustand

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return privateAxios(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default privateAxios;
