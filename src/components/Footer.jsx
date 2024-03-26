import "./Footer.css";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <span>Ⓒ</span>
      {year} Buddy Planner
    </footer>
  );
};

export default Footer;
