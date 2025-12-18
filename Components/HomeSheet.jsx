import React from "react";

import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handlein = () => {
    navigate("/login");
  };

  return (
    <div className="home-container">
      {/* TOP NAVBAR */}
      <div className="top-navbar">
        <div className="logo">My App</div>

        <div className="top-links">
          <button className="logout-btn" onClick={handlein}>
            Login
          </button>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="layout">
        {/* LEFT SIDEBAR
        <div className="sidebar">
          <Link to="/" className="side-item active">
            Home
          </Link>
          <Link to="/login" className="side-item">
            Dashboard
          </Link>
          <Link to="/login" className="side-item">
            Organisation
          </Link>
          <Link to="/login" className="side-item">
            Login
          </Link>
          <Link to="/register" className="side-item">
            Signup
          </Link>
          <Link to="/settings" className="side-item">
            Settings
          </Link>
        </div> */}

        {/* CONTENT AREA */}
        <div className="content">
          <h1>Welcome to Home Page</h1>
          {/* <p>
            This is your application dashboard. You can navigate using the
            sidebar.
          </p> */}
        </div>
      </div>
    </div>
  );
}
