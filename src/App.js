import "./App.css";

import { useAuth } from "./hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import { refreshUser } from "./redux/auth/operations";
import { useDispatch } from "react-redux";
import { useEffect, lazy } from "react";

import { Layout } from "./components/Layout";
import { PrivateRoute } from "./components/PrivateRoute";
import { RestrictedRoute } from "./components/RestrictedRoute";

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  const HomePage = lazy(() => import("./pages/Home"));
  const RegisterPage = lazy(() => import("./pages/Register"));
  const LoginPage = lazy(() => import("./pages/Login"));
  const ContactsPage = lazy(() => import("./pages/Contacts"));
  const ContactDetailsPage = lazy(() => import("./pages/ContactDetails"));

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <div className="div_fir">
      <b className="first">Please wait...</b>
    </div>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/contacts"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute redirectTo="/contacts" component={<LoginPage />} />
          }
        />
        <Route
          path="/contacts/:contactId"
          element={
            <PrivateRoute
              redirectTo="/contacts"
              component={<ContactDetailsPage />}
            />
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
