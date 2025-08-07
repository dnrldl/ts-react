import Container from "components/Container";
import Button from "components/ui/Button/Button";
import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Home</h1>
      <Button onClick={() => navigate("/users/looper")}>Test</Button>
    </Container>
  );
};

export default React.memo(HomePage);
