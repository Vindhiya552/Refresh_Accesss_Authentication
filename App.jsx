import "./App.css";
import "./Components/Home.css";

import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Homehome from "./Components/Homehome";

// ⭐ You must import Routes + Route
import { Routes, Route } from "react-router-dom";
import PublicRoute from "./Components/PublicRoute";
import AppRouter from "./routes/approutes";

function App() {
  return (
    // <div>
    //   <Routes>
    //     <Route
    //       path="/login"
    //       element={
    //         <PublicRoute>
    //           <Login />
    //         </PublicRoute>
    //       }
    //     />

    //     <Route
    //       path="/register"
    //       element={
    //         <PublicRoute>
    //           <Register />
    //         </PublicRoute>
    //       }
    //     />

    //     <Route
    //       path="/dashboard"
    //       element={
    //         <ProtectedRoute>
    //           <Homehome />
    //         </ProtectedRoute>
    //       }
    //     />

    //     <Route
    //       path="/user"
    //       element={
    //         <ProtectedRoute>
    //           <>user Home Page</>
    //         </ProtectedRoute>
    //       }
    //     />

    //     <Route path="*" element={<>No route</>} />
    //   </Routes>
    // </div>

    <>
      <AppRouter />
    </>
  );
}

export default App;
