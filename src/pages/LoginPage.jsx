import { useNavigate } from "react-router-dom";
import PageMotion from "../components/PageMotion";
import "./LoginPage.css";
import { UseAuth } from "../app/auth/auth";
import { useEffect } from "react";
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = UseAuth();

  useEffect(() => {
    const firebaseAuth = getAuth();
    if (isSignInWithEmailLink(firebaseAuth, window.location.href)) {
      let email = localStorage.getItem("emailForSignIn");
      if (!email) {
        navigate("/auth?message=somethingWentWrong");
      }
      signInWithEmailLink(firebaseAuth, email, window.localStorage.href)
        .then((result) => {
          const user = result.user;
          const userJson = {
            email: user.email,
            id: user.uid,
            accessToken: user.accessToken,
            name: user.displayName,
            photoUrl: user.photoURL,
          };
          auth.signin(userJson, () => {
            localStorage.setItem("user", JSON.stringify(userJson));
            navigate("/app");
          });
        })
        .catch((err) => {
          console.error("Error signin in with email link", err);
          navigate("/auth?message=errorWithLink");
        });
    }
  }, [navigate, auth]);
  return (
    <PageMotion>
      <h1>LoginPage</h1>
    </PageMotion>
  );
};

export default LoginPage;
