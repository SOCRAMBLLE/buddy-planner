import Logo from "../assets/brand/logo.png";
import PageMotion from "../components/PageMotion";
import "./HomePage.css";

const HomePage = () => {
  return (
    <PageMotion>
      <main className="homepage--container">
        <div className="homepage--brand-container">
          <img src={Logo} />
          <h1>
            Organize Their Joy,
            <br /> Simplify Your Life.
          </h1>
        </div>
      </main>
    </PageMotion>
  );
};

export default HomePage;
