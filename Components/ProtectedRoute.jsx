import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import api from "../Services/api";

function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null);
  const [authre, setAuthre] = useState(null);

  useEffect(() => {
    api
      .get("/auth/check")
      .then(() => setAuth(true))
      .catch(() => setAuth(false));
  }, []);

  if (auth === null) return <p>Loading...</p>;
  console.log("privateroutes:", auth);

  if (setAuth === false) {
    useEffect(() => {
      api
        .get("/auth/refresh")
        .then(() => setAuthre(true))
        .catch(() => setAuthre(false));
    }, []);
  } else {
    return children;
  }

  return authre ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
