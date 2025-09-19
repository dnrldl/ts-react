import Container from "shared/layouts/container";
import LoginForm from "features/auth/components/LoginForm";
import { useSearchParams } from "react-router-dom";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirectPath") || "";

  return (
    <Container title="Login" backButton>
      <LoginForm redirectPath={redirectPath} />
    </Container>
  );
};

export default LoginPage;
