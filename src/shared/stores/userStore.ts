import { create } from "zustand";

export type UserInfo = {
  userId: number | null;
  email: string | null;
  nickname: string | null;
  profileImageUrl: string | null;
  role: string | null;
};

type AuthState = {
  userInfo: UserInfo | null;
  isLoggedIn: () => boolean;
  setUserInfo: (info: Partial<UserInfo>) => void;
  clear: () => void;
};

const initialUser: UserInfo = {
  userId: null,
  email: null,
  nickname: null,
  profileImageUrl: null,
  role: null,
};

export const useUserStore = create<AuthState>((set, get) => ({
  userInfo: null,

  setUserInfo: (info) =>
    set((state) => ({
      userInfo: {
        ...(state.userInfo ?? initialUser),
        ...info,
      },
    })),

  clear: () =>
    set({
      userInfo: initialUser,
    }),

  isLoggedIn: () => !!get().userInfo,
}));
