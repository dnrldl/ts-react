import Container from "components/Container";
import LoginForm from "components/form/Login/LoginForm";
import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/";

  return (
    <Container title="Login" backButton>
      <LoginForm redirectPath={from} />
    </Container>
  );
};

export default LoginPage;
