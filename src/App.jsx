import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import Dashboard from "./pages/app/Dashboard";
import LoginPage from "./pages/LoginPage";
import { PrivateRoute, ProvideAuth } from "./app/auth/auth";
import AppLayout from "./pages/app/AppLayout";
import AuthPage, { Action as FormAction } from "./pages/AuthPage";
import ProfilePage from "./pages/app/ProfilePage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="auth">
          <Route index action={FormAction} element={<AuthPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="app"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="agenda" />
          <Route path="tasks" />
          <Route path="food" />
          <Route path="finance" />
          <Route path="settings" />
        </Route>
      </Route>
    )
  );

  return (
    <ProvideAuth>
      <RouterProvider router={router} />
    </ProvideAuth>
  );
}

export default App;
