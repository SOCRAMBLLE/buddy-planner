import { NavLink } from "react-router-dom";
import Logo from "../assets/brand/logo.png";
import "./Navbar.css";
import { UseAuth } from "../app/auth/auth";
import pawIcon from "../assets/brand/paw.png";

const NavBar = () => {
  const { user } = UseAuth();
  return (
    <nav className="navbar--container">
      <div className="navbar--brand visible">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? "logoHidden" : "")}
        >
          <img src={Logo} />
        </NavLink>
      </div>
      <div className="navbar--navlinks">
        <NavLink
          to="about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
        <NavLink
          to="app"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          App
        </NavLink>
        {user && (
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button className="navbar--paw-user">
              <img src={pawIcon} />
            </button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
