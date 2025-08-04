import Container from "components/Container";
import Button from "components/ui/Button/Button";
import React from "react";
import { getAgoTime } from "utils/dateUtils";

const HomePage = () => {
  return (
    <Container>
      <h1>Home</h1>
      <Button
        onClick={() => console.log(getAgoTime(String(new Date("2025-08-03"))))}
      >
        Test
      </Button>
    </Container>
  );
};

export default React.memo(HomePage);
