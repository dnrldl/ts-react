import { AlreadyAuth } from "components/auth/AlreadyAuth";
import RequireAuth from "components/auth/RequireAuth";
import { useApplyTheme } from "hooks/useApplyTheme";
import HeaderLayout from "layouts/HeaderLayout";
import NoHeaderLayout from "layouts/NoHeaderLayout";
import HomePage from "pages/home";
import LoginPage from "pages/login";
import NotFoundPage from "pages/notfound";
import PostPage from "pages/posts";
import PostAddPage from "pages/posts/PostAddPage";
import PostDetailPage from "pages/posts/PostDetailPage";
import RegisterPage from "pages/register";
import MyProfilePage from "pages/user-profile/MyProfilePage";
import OtherProfilePage from "pages/user-profile/OtherProfilePage";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  useApplyTheme();

  return (
    <>
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
          <Route
            path="/posts/add"
            element={
              <RequireAuth>
                <PostAddPage />
              </RequireAuth>
            }
          />

          {/* 마이페이지 */}
          <Route
            path="/users/me"
            element={
              <RequireAuth>
                <MyProfilePage />
              </RequireAuth>
            }
          />
          {/* 유저페이지 */}
          <Route path="/users/:id" element={<OtherProfilePage />} />
        </Route>

        {/* 헤더 안보이는 레이아웃 */}
        <Route element={<NoHeaderLayout />}></Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-center" richColors />
    </>
  );
};

export default App;
