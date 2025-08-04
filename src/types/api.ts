export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export type RegisterRequest = {
  email: string;
  password: string;
  nickname: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender?: string;
  birth?: string;
};
