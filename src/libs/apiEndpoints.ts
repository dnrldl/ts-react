// TODO
export type ApiAccessType = "pub" | "pri";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL ?? "http://localhost:8080";

export interface ApiEndpoint {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  auth: ApiAccessType;
}

export const AUTH_ENDPOINTS = {
  LOGIN: { path: "/api/auth/login", method: "POST", auth: "pub" } as const,
  LOGOUT: { path: "/api/auth/logout", method: "POST", auth: "pri" } as const,
  REFRESH: { path: "/api/auth/refresh", method: "POST", auth: "pub" } as const,
} satisfies Record<string, ApiEndpoint>;

export const getApiUrl = (endpoint: ApiEndpoint) =>
  `${API_BASE_URL}${endpoint.path}`;
