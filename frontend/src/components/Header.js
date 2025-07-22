import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            🔗 LinkShort
          </Link>

          <nav className="nav">
            {user ? (
              <>
                <span className="nav-link">Welcome back!</span>
                <button
                  onClick={logout}
                  className="nav-link"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
