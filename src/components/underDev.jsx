import PageMotion from "./PageMotion";
import "./underDev.css";
import underDevLogo from "../assets/misc/web-development2.png";

const UnderDev = () => {
  return (
    <PageMotion>
      <div className="under-dev--container">
        <h2>This feature is under development</h2>
        <img src={underDevLogo} />
      </div>
    </PageMotion>
  );
};

export default UnderDev;
