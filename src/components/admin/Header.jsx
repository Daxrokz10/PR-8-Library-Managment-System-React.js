import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <>
      <nav className="top-navbar">
        {/* Left */}
        <div className="nav-left">
          <span className="logo">PORTAL</span>
        </div>

        {/* Center */}
        <div className="nav-center">
          <NavLink to="/admin" className="nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/add-book" className="nav-link">
            Add Book
          </NavLink>
          <NavLink to="/view-books" className="nav-link">
            View Books
          </NavLink>
        </div>

        {/* Right */}
        <div className="nav-right">
          <img
            src="https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
            alt="profile"
          />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <style>{`
        .top-navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          z-index: 1000;
        }

        .nav-left .logo {
          font-weight: 700;
          font-size: 18px;
          color: #111827;
        }

        .nav-center {
          display: flex;
          gap: 20px;
        }

        .nav-link {
          text-decoration: none;
          color: #374151;
          font-size: 14px;
          padding: 6px 10px;
          border-radius: 4px;
        }

        .nav-link.active {
          background: #e5f0ff;
          color: #1d4ed8;
          font-weight: 600;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-right img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }

        .nav-right button {
          background: #dc2626;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          font-size: 13px;
          cursor: pointer;
        }

        .nav-right button:hover {
          background: #b91c1c;
        }
      `}</style>
    </>
  );
}

export default Header;
