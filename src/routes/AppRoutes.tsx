import AlreadyAuth from "features/auth/components/AlreadyAuth";
import RequireAuth from "features/auth/components/RequireAuth";
import LoginPage from "features/auth/pages/LoginPage";
import RegisterPage from "features/auth/pages/RegisterPage";
import HomePage from "features/home/pages/HomePage";
import PostDetailPage from "features/post/pages/PostDetailPage";
import PostPage from "features/post/pages/PostPage";
import MyProfilePage from "features/user/pages/MyProfilePage";
import { Route, Routes } from "react-router-dom";
import HeaderLayout from "shared/layouts/HeaderLayout";
import NoHeaderLayout from "shared/layouts/NoHeaderLayout";
import NotFoundPage from "shared/pages/notfound/NotFoundPage";

const AppRoutes = () => {
  return (
    <Routes>
      {/* 헤더 보이는 레이아웃 */}
      <Route element={<HeaderLayout />}>
        {/* 홈페이지 */}
        <Route path="/" element={<HomePage />} />
        {/* 로그인 */}
        <Route
          path="/login"
          element={
            <AlreadyAuth>
              <LoginPage />
            </AlreadyAuth>
          }
        />
        {/* 회원가입 */}
        <Route
          path="/register"
          element={
            <AlreadyAuth>
              <RegisterPage />
            </AlreadyAuth>
          }
        />

        {/* 게시글 */}
        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />

        {/* 마이페이지 */}
        <Route
          path="/users/me"
          element={
            <RequireAuth>
              <MyProfilePage />
            </RequireAuth>
          }
        />
      </Route>

      {/* 헤더 안보이는 레이아웃 */}
      <Route element={<NoHeaderLayout />}></Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
