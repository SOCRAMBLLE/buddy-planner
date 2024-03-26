/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
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
