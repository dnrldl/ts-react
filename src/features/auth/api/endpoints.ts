export const authEndpoints = {
  login: { method: "post", path: "/auth/login" },
  logout: { method: "post", path: "/auth/logout" },
  register: { method: "post", path: "/auth/register" },
  refresh: { method: "post", path: "/auth/refresh" },
  me: { method: "get", path: "/auth/me" },
};
