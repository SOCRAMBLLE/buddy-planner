import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <div>
        <span>Ⓒ</span>
        {year} Buddy Planner
      </div>
      <Link to="https://marcosfraga.ch" target="_blank">
        <img src="https://www.marcosfraga.ch/static/media/MARCOS%20W.e116c7943d9b526d93e5.png" />
      </Link>
    </footer>
  );
};

export default Footer;
