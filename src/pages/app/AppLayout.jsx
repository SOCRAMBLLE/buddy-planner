import { Outlet } from "react-router-dom";
import "./AppLayout";

const AppLayout = () => {
  return (
    <>
      <h1>AppLayout</h1>
      <Outlet />
    </>
  );
};

export default AppLayout;
