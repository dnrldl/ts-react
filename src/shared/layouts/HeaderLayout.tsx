import { memo } from "react";
import { Outlet } from "react-router-dom";
import Header from "shared/components/header/Header";

const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default memo(HeaderLayout);
