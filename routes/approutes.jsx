import { useRoutes } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";

import Dashboard from "../Components/Dashboard";
import PublicRoute from "../Components/PublicRoute";
import ProtectedRoute from "../Components/ProtectedRoute";
import OrganisationRegister from "../pages/organisations/orgdetails";

import OrgList from "../pages/organisations/org.list";
import OrgEdit from "../pages/organisations/org.edit";
import Home from "../Components/HomeSheet";

const PublicRoutes = [
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/OrganisationRegister",
    element: <OrganisationRegister />,
  },

  {
    path: "/OrganisationEdit/:id",
    element: <OrgEdit />,
  },

  {
    path: "/",
    element: <Home />,
  },
];
const PrivateRoutes = [
  {
    path: "/OrganisationList",

    element: (
      <ProtectedRoute>
        <OrgList />
      </ProtectedRoute>
    ),
  },
];

export default function AppRouter() {
  const element = useRoutes([
    ...PublicRoutes,
    ...PrivateRoutes,
    { path: "*", element: <>No Route Found</> },
  ]);

  return <>{element}</>;
}
