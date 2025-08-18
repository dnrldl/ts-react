import axios, { AxiosInstance } from "axios";

export const createHttpClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL + "/api",
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};
