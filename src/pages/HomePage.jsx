import Logo from "../assets/brand/logo.png";
import "./HomePage.css";

const HomePage = () => {
  return (
    <>
      <main className="homepage--container">
        <div className="homepage--brand-container">
          <img src={Logo} />
          <h1>Organize Their Joy, Simplify Your Life.</h1>
        </div>
      </main>
    </>
  );
};

export default HomePage;
