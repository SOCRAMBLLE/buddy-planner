/* eslint-disable react/prop-types */
import PageMotion from "../components/PageMotion";
import "./AuthPage.css";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { GoogleIcon } from "../components/ui/Icons";
import { CreateUser, LoginUser, UseAuth } from "../app/auth/auth";
import { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

export async function Action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  try {
    const data = await CreateUser(email);
    if (data) {
      return data;
    }
    return { error: "Unknown error when trying to login" };
  } catch (err) {
    console.log(err);
    return { error: err.message || "Unknown error when trying to login" };
  }
}

const AuthPage = () => {
  const actionData = useActionData();
  const navigate = useNavigate();
  const auth = UseAuth();
  const [signUpMessage, setSignUpMessage] = useState(null);
  const [signUpError, setSignUpError] = useState(null);
  useEffect(() => {
    if (actionData?.success) {
      console.log(actionData.success);
      setSignUpMessage(actionData);
    } else if (actionData?.error) {
      setSignUpError(actionData.error);
    }
  }, [actionData]);

  const handleGoogleButton = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const googleLogin = await LoginUser(provider);
      auth.signin(googleLogin, () => {
        localStorage.setItem("user", JSON.stringify(googleLogin));
        navigate("/app");
      });
      return null;
    } catch (err) {
      setSignUpError(err);
      return null;
    }
  };

  return (
    <PageMotion>
      <main className="auth-page--container">
        <h1>
          One click away from <br />
          streamlining your pet&apos;s life
        </h1>
        <div className="auth-page--reg-container">
          <button
            onClick={handleGoogleButton}
            className="auth-page--google-btn"
          >
            <GoogleIcon className="google-icon" />
            <span>Sign up with your Google account</span>
          </button>
          <hr className="hr-text gradient" data-content="OR" />
          <Form method="post" className="auth-page--email-sign" replace>
            <input
              name="email"
              type="email"
              placeholder="your-email@email.com"
            />
            <button>Sign up</button>
          </Form>
          {signUpMessage && (
            <pre className="auth-page--signin-message">
              Please check your email and click the link to Login
            </pre>
          )}
          {signUpError && (
            <pre className="auth-page--error-message">{signUpError}</pre>
          )}
        </div>
      </main>
    </PageMotion>
  );
};

export default AuthPage;
