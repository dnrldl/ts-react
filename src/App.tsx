import { refreshAccessTokenApi, authMe } from "features/auth/api/api";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "routes/AppRoutes";
import { useAccessTokenStore } from "shared/stores/accessTokenStore";
import { useUserStore } from "shared/stores/userStore";
import { Toaster } from "sonner";

const App = () => {
  const setAccessToken = useAccessTokenStore((s) => s.setToken);
  const setUserInfo = useUserStore((s) => s.setUserInfo);

  useEffect(() => {
    const initApp = async () => {
      try {
        // 1. refreshToken으로 accessToken 재발급
        const response = await refreshAccessTokenApi();
        console.log("App=", response);
        setAccessToken(response);

        // 2. 사용자 정보 동기화
        const user = await authMe();

        setUserInfo(user);
      } catch {
        setAccessToken("");
        setUserInfo({});
      }
    };

    initApp();
  }, [setAccessToken, setUserInfo]);

  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster position="top-center" richColors />
    </BrowserRouter>
  );
};

export default App;
