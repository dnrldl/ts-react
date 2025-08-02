import { Link } from "react-router-dom";
import "./NotFoundPage.module.scss";
import Container from "components/Container";

const NotFoundPage = () => {
  return (
    <Container>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <Link to="/" className="goHome">
        홈으로 돌아가기
      </Link>
    </Container>
  );
};

export default NotFoundPage;
