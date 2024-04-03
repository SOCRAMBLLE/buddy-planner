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
import { PrivateRoute, ProvideAuth } from "./app/auth/auth";
import AppLayout from "./pages/app/AppLayout";
import AuthPage, { Action as FormAction } from "./pages/AuthPage";
import ProfilePage, { Loader as PetLoader } from "./pages/app/ProfilePage";
import BuddyRegPage from "./pages/app/BuddyRegister";
import EditPet, { Loader as petLoader } from "./pages/app/EditPet";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="auth">
          <Route index action={FormAction} element={<AuthPage />} />
        </Route>
        <Route path="profile">
          <Route
            index
            loader={PetLoader}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route path="register-pet" element={<BuddyRegPage />} />
          <Route path="pet" element={<EditPet />} loader={petLoader} />
        </Route>
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
