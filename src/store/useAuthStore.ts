import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  userId: number | null;
  email: string | null;
  nickname: string | null;
  profileImageUrl: string | null;
  role: string | null;
  isLoggedIn: boolean;

  setAccessToken: (token: string | null) => void;
  setUserInfo: (
    info: Partial<Omit<AuthState, "setAccessToken" | "clear" | "setUserInfo">>
  ) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  userId: null,
  email: null,
  nickname: null,
  profileImageUrl: null,
  role: null,
  isLoggedIn: !!localStorage.getItem("accessToken"),

  setAccessToken: (token) => {
    if (token) {
      set({ accessToken: token, isLoggedIn: true });
      localStorage.setItem("accessToken", token);
    } else {
      set({ accessToken: null, isLoggedIn: false });
      localStorage.removeItem("accessToken");
    }
  },

  setUserInfo: (info) => {
    set((state) => ({ ...state, ...info }));
  },

  clear: () => {
    set({
      accessToken: null,
      userId: null,
      email: null,
      nickname: null,
      profileImageUrl: null,
      role: null,
      isLoggedIn: false,
    });
    localStorage.removeItem("accessToken");
  },
}));
