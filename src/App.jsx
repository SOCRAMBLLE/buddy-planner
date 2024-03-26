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
import Dashboard from "./pages/Dashboard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="app">
          <Route index element={<Dashboard />} />
          <Route path="login" />
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

  return <RouterProvider router={router} />;
}

export default App;
