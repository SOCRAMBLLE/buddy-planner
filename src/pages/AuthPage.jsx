import PageMotion from "../components/PageMotion";
import "./AuthPage.css";
import { Form, Link } from "react-router-dom";
import { GoogleIcon } from "../components/ui/Icons";

const AuthPage = () => {
  return (
    <PageMotion>
      <main className="auth-page--container">
        <h1>
          One click away from <br />
          streamlining your pet&apos;s life
        </h1>
        <div className="auth-page--reg-container">
          <Link to="">
            <button className="auth-page--google-btn">
              <GoogleIcon className="google-icon" />
              <span>Sign up with your Google account</span>
            </button>
          </Link>
          <hr className="hr-text gradient" data-content="OR" />
          <Form className="auth-page--email-sign">
            <input />
            <button>Sign up</button>
          </Form>
        </div>
      </main>
    </PageMotion>
  );
};

export default AuthPage;
