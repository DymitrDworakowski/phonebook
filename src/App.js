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

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
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
