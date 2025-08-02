import { useApplyTheme } from "hooks/useApplyTheme";
import HeaderLayout from "layouts/HeaderLayout";
import NoHeaderLayout from "layouts/NoHeaderLayout";
import HomePage from "pages/home";
import NotFoundPage from "pages/notfound";
import PostPage from "pages/posts";
import PostDetailPage from "pages/posts/PostDetailPage";
import PostAddPage from "pages/posts/PostAddPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  useApplyTheme();

  return (
    <>
      <Routes>
        {/* 헤더 보이는 레이아웃 */}
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/posts" element={<PostPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/add" element={<PostAddPage />} />
        </Route>

        {/* 헤더 안보이는 레이아웃 */}
        <Route element={<NoHeaderLayout />}></Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
