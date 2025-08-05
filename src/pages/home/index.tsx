import Container from "components/Container";
import Button from "components/ui/Button/Button";
import React from "react";
import { openWindow } from "utils/popup";

const HomePage = () => {
  return (
    <Container>
      <h1>Home</h1>
      <Button onClick={() => openWindow("https://www.naver.com")}>Test</Button>
    </Container>
  );
};

export default React.memo(HomePage);
