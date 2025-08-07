import Header from "components/Header";
import { memo } from "react";
import { Outlet } from "react-router-dom";

const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default memo(HeaderLayout);
