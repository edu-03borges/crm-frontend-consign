import { lazy } from "react";
import Loadable from "ui-component/Loadable";

const AuthLogin = Loadable(lazy(() => import("views/pages/authentication/authentication/Login")));

const AuthenticationRoutes = {
  path: "/login",
  element: <AuthLogin />,
};

export default AuthenticationRoutes;
