import Container from "shared/layouts/container";
import RegisterForm from "features/auth/components/RegisterForm";

const RegisterPage = () => {
  return (
    <Container>
      <h1>Register</h1>
      <RegisterForm />
    </Container>
  );
};

export default RegisterPage;
