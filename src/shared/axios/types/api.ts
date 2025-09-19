export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  timestamp: string;
}

export interface ApiErrorResponse extends Error {
  success: false;
  code: string;
  message: string;
  status: number;
  timestamp: string;
}
