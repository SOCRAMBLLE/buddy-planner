import { Outlet } from "react-router-dom";
import "./AppLayout";
import PageMotion from "../../components/PageMotion";

const AppLayout = () => {
  return (
    <PageMotion>
      <h1>AppLayout</h1>
      <Outlet />
    </PageMotion>
  );
};

export default AppLayout;
