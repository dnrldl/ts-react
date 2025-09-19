import { loginFormSchema, registerFormSchema } from "features/auth/schemas";
import z from "zod";

export type LoginFormData = z.infer<typeof loginFormSchema>;
export type RegisterFormData = z.infer<typeof registerFormSchema>;

export type LoginResponse = {
  accessToken: string;
  userId: number;
  email: string;
  nickname: string;
  profileImageUrl: string;
  role: string;
};
