import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import api from "../Services/api";

function ProtectedRoute({ children }) {
  const [authre, setAuthre] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/auth/check", { withCredentials: true });
        setAuthre(true);
      } catch (err) {
        if (err.response?.status === 401) {
          try {
            await api.post("/auth/refresh", {}, { withCredentials: true });
            setAuthre(true);
          } catch (refreshErr) {
            setAuthre(false);
          }
        } else {
          setAuthre(false);
        }
      }
    };

    checkAuth();
  }, []);

  if (authre === null) {
    return <div>Checking authentication...</div>;
  }

  return authre ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
