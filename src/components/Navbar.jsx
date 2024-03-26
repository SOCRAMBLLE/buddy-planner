import { NavLink } from "react-router-dom";
import Logo from "../assets/brand/logo.png";
import "./Navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar--container">
      <div className="navbar--brand visible">
        <NavLink>
          <img src={Logo} />
        </NavLink>
      </div>
      <div className="navbar--navlinks">
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
        <NavLink
          to="/app"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          App
        </NavLink>
      </div>
    </nav>
  );
};

export default NavBar;
