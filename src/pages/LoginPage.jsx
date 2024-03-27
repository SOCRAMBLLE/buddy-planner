import { Form } from "react-router-dom";
import PageMotion from "../components/PageMotion";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <PageMotion>
      <h1>LoginPage</h1>
      <div>
        <Form></Form>
      </div>
    </PageMotion>
  );
};

export default LoginPage;
