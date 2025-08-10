export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse {
  success: boolean;
  code: string;
  message: string;
  status: number;
  timestamp: string;
}
