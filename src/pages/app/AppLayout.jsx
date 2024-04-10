import { NavLink, Outlet } from "react-router-dom";
import "./AppLayout.css";
import PageMotion from "../../components/PageMotion";
import { UseAuth } from "../../app/auth/auth";
import { MdDashboard } from "react-icons/md";
import { FaTasks, FaCalendarAlt, FaBone, FaChartBar } from "react-icons/fa";

const AppLayout = () => {
  const auth = UseAuth();
  const user = auth.user;
  return (
    <PageMotion>
      <h4 className="app--account-title">Hey {user.name}!</h4>
      <nav className="app--navigation">
        <NavLink
          to="."
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <MdDashboard />
        </NavLink>
        <NavLink
          to="agenda"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaCalendarAlt />
        </NavLink>
        <NavLink
          to="tasks"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaTasks />
        </NavLink>
        <NavLink
          to="food"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaBone />
        </NavLink>
        <NavLink
          to="finance"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaChartBar />
        </NavLink>
      </nav>
      <Outlet />
    </PageMotion>
  );
};

export default AppLayout;
