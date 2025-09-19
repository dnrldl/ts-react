import { openWindow } from "utils/popup";

export const useSocialLogin = () => {
  const naverLogin = () => {
    const NAVER_APP_ID = process.env.REACT_APP_NAVER_APP_ID;
    const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_APP_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URI}`;

    openWindow(naverAuthUrl, 300, 500);
  };
  const kakaoLogin = () => {
    const NAVER_APP_ID = process.env.REACT_APP_NAVER_APP_ID;
    const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_APP_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URI}`;

    openWindow(naverAuthUrl, 480, 680);
  };
  const facebookLogin = () => {
    const NAVER_APP_ID = process.env.REACT_APP_NAVER_APP_ID;
    const NAVER_REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;

    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?client_id=${NAVER_APP_ID}&response_type=code&redirect_uri=${NAVER_REDIRECT_URI}`;

    openWindow(naverAuthUrl, 600, 680);
  };

  return {
    naverLogin,
    kakaoLogin,
    facebookLogin,
  };
};
