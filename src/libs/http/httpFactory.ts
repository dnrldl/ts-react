import axios, { AxiosInstance } from "axios";

export const createHttpClient = (withAuth: boolean): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (withAuth) {
    instance.interceptors.request.use((config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    });
  }

  return instance;
};
