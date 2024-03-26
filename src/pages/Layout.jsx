import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="layout--body">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
