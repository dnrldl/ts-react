import { Outlet } from "react-router-dom";

const NoHeaderLayout = () => {
  return (
    <div style={{ marginTop: "64px" }}>
      <Outlet />
    </div>
  );
};

export default NoHeaderLayout;
