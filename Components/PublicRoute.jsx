// src/PublicRoute.jsx

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function PublicRoute({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/publiccheck", { withCredentials: true })
      .then((res) => {
        if (res.data.auth) setAuth(true);
        else setAuth(false);
      })
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;

  // If logged in → block access to public pages, redirect to dashboard
  return auth ? <Navigate to="/Organisationlist" /> : children;
}

export default PublicRoute;
