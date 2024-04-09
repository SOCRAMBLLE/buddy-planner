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
import Dashboard, { Loader as DashLoader } from "./pages/app/Dashboard";
import { PrivateRoute, ProvideAuth } from "./app/auth/auth";
import AppLayout from "./pages/app/AppLayout";
import AuthPage, { Action as FormAction } from "./pages/AuthPage";
import ProfilePage, { Loader as PetLoader } from "./pages/app/ProfilePage";
import BuddyRegPage from "./pages/app/BuddyRegister";
import EditPet, { Loader as petLoader } from "./pages/app/EditPet";
import Agenda, { Loader as agendaLoader } from "./pages/app/Agenda";
import Tasks, { Loader as tasksLoader } from "./pages/app/Tasks";
import { ErrorPage, NotFound } from "./pages/app/error-page";
import FoodPage from "./pages/app/Food";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route
          path="auth"
          action={FormAction}
          element={<AuthPage />}
          errorElement={<ErrorPage />}
        />

        <Route path="profile" errorElement={<ErrorPage />}>
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
          errorElement={<ErrorPage />}
        >
          <Route index element={<Dashboard />} loader={DashLoader} />
          <Route path="agenda" element={<Agenda />} loader={agendaLoader} />
          <Route path="tasks" element={<Tasks />} loader={tasksLoader} />
          <Route path="food" element={<FoodPage />} />
          <Route path="finance" />
          <Route path="settings" />
        </Route>
        <Route path="*" element={<NotFound />} />
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
