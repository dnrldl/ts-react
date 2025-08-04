import { toast } from "sonner";
import { create } from "zustand";

type AuthState = {
  accessToken: string | null;
  setAccessToken: (token: string) => void;
  clear: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  setAccessToken: (token) => {
    set({ accessToken: token });
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  },
  clear: () => {
    set({ accessToken: null });
    localStorage.removeItem("accessToken");
    toast.info("Logout!");
  },
}));
