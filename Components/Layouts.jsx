import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };

  return (
    <div className="layout-container">
      {/* TOP NAVBAR */}
      <div className="top-navbar">
        <div className="logo">My App</div>

        <div className="top-links">
          {/* <Link to="/profile">Profile</Link> */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="layout-body">
        {/* SIDEBAR */}
        <div className="sidebar">
          <Link to="/" className="side-item">
            Home
          </Link>
          <Link to="/dashboard" className="side-item">
            Dashboard
          </Link>
          <Link to="/projects" className="side-item">
            Projects
          </Link>
          <Link to="/settings" className="side-item">
            Settings
          </Link>
        </div>

        {/* PAGE CONTENT */}
        <div className="layout-content">{children}</div>
      </div>
    </div>
  );
}
