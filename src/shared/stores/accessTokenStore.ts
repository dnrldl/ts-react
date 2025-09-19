import { create } from "zustand";

interface AccessTokenState {
  token: string | null;
  setToken: (t: string) => void;
  clearToken: () => void;
}

export const useAccessTokenStore = create<AccessTokenState>((set) => ({
  token: null,
  setToken: (t) =>
    set({
      token: t,
    }),
  clearToken: () => set({ token: null }),
}));
