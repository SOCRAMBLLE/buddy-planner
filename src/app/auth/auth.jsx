import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { firebaseApp } from "../api/firebase";
import {
  deleteUser,
  getAuth,
  sendSignInLinkToEmail,
  signInWithPopup,
} from "firebase/auth";
import PropTypes from "prop-types";

export const AuthContext = createContext();

const fakeAuth = {
  isAuthenticated: false,
  signin(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

export function UseAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const signin = (user, cb) => {
    return fakeAuth.signin(() => {
      setCurrentUser(user);
      setUser(user);
      if (cb) cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signout(() => {
      localStorage.removeItem("user");
      setUser(null);
      if (cb) cb();
    });
  };

  return {
    user,
    signin,
    signout,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
ProvideAuth.propTypes = {
  children: PropTypes.node,
};

export function PrivateRoute({ children }) {
  let { user } = UseAuth();
  const location = useLocation();

  return user ? (
    children
  ) : (
    <Navigate
      to={`/auth?login=false&redirectTo=${location.pathname}`}
      replace
      state={{ from: location }}
    />
  );
}
PrivateRoute.propTypes = {
  children: PropTypes.node,
};

let currentUser = null;

const setCurrentUser = (user) => {
  currentUser = user;
};

export const GetCurrentUser = () => {
  return currentUser;
};

export async function LoginUser(provider) {
  const auth = getAuth(firebaseApp);

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userJson = {
      email: user.email,
      id: user.uid,
      accessToken: user.accessToken,
      name: user.displayName,
      photoUrl: user.photoURL,
    };
    return userJson;
  } catch (err) {
    const errorCode = err.code;
    const errorMessage = err.message;
    throw {
      message: errorMessage,
      status: errorCode,
    };
  }
}

export async function CreateUser(email) {
  const auth = getAuth(firebaseApp);
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: "http://localhost:5173/app",
    // This must be true.
    handleCodeInApp: true,
  };
  try {
    const result = await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    console.log(result);
    return { success: true };
  } catch (err) {
    console.log(err);
    const errorCode = err.code;
    const errorMessage = err.message;
    throw {
      message: errorMessage,
      status: errorCode,
    };
  }
}

export async function DeleteUser(user) {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (user.id === currentUser.uid) {
    try {
      await deleteUser(currentUser);
    } catch (err) {
      throw new Error(err);
    }
  }
}
