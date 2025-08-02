import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api.example.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 공통 에러 처리
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("[API Error]", err);
    return Promise.reject(err);
  }
);

export default axiosInstance;
