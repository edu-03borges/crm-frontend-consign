import { lazy } from "react";
import { Navigate } from 'react-router-dom';
import { getToken } from 'utils';
import Loadable from "ui-component/Loadable";

const AuthLogin = Loadable(lazy(() => import("views/pages/authentication/authentication/Login")));

const ProtectedAuth = () => {
  const isAuthenticated = !!getToken();

  return isAuthenticated ? <Navigate to="/" /> : <AuthLogin />;
};

const AuthenticationRoutes = {
  path: "/login",
  element: <ProtectedAuth />,
};

export default AuthenticationRoutes;