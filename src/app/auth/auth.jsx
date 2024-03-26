import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { firebaseApp } from "../api/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
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
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return fakeAuth.signin(() => {
      setCurrentUser(true);
      setUser(true);
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

ProvideAuth.propTypes = {
  children: PropTypes.node,
};
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export function PrivateRoute({ children }) {
  let { user } = UseAuth();
  const location = useLocation();
  return user ? (
    children
  ) : (
    <Navigate
      to={`/login?login=false&redirectTo=${location.pathname}`}
      replace
      state={{ from: location }}
    />
  );
}

let currentUser = null;

const setCurrentUser = (user) => {
  currentUser = user;
};

export const GetCurrentUser = () => {
  return currentUser;
};

export async function LoginUser(email, password) {
  const auth = getAuth(firebaseApp);
  try {
    const data = await signInWithEmailAndPassword(auth, email, password);
    const user = data.user;
    const userJson = {
      id: user.uid,
      email: user.email,
      token: user.accessToken,
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

export async function CreateUser(email, password) {
  const auth = getAuth(firebaseApp);
  try {
    const data = await createUserWithEmailAndPassword(auth, email, password);
    const user = data.user;
    const userJson = {
      id: user.uid,
      email: user.email,
      token: user.accessToken,
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
