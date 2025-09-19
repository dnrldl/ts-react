import { logoutApi } from "features/auth/api/api";
import { useAccessTokenStore } from "shared/stores/accessTokenStore";
import { useUserStore } from "shared/stores/userStore";

export const useAuth = () => {
  const token = useAccessTokenStore((s) => s.token);
  const clearToken = useAccessTokenStore((s) => s.clearToken);
  const clearUserInfo = useUserStore((s) => s.clear);

  const isLoggedIn = !!token;

  const logout = async () => {
    await logoutApi(); // 서버 로그아웃 처리
    clearToken(); // 전역 상태 토큰 삭제
    clearUserInfo(); // 전역 상태 유저 정보 삭제
  };

  return { logout, isLoggedIn };
};
