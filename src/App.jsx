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
import LoginPage from "./pages/login";
import { PrivateRoute, ProvideAuth } from "./app/auth/auth";
import AppLayout from "./pages/app/AppLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="app"
          element={
            <PrivateRoute>
              <AppLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="signin" />
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
