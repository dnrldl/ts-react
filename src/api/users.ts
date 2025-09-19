import { axiosInstance } from "shared/axios/axiosInstance";
import { User } from "shared/types/user";

export const getPublicUserProfile = (userId: number) =>
  axiosInstance.get<User>(`/users/${userId}`);

export const getMyProfile = () => axiosInstance.get<User>("/users/me");

export const checkEmailDuplicate = (email: string) =>
  axiosInstance.get(`/users/check/email?email=${email}`);
