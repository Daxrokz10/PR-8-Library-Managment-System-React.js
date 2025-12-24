import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

function UserHeader({ onLogout }) {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const syncUser = () =>
      setUser(JSON.parse(localStorage.getItem("currentUser")));
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  const userName = user?.name || user?.username || "User";
  const userImage =
    user?.image ||
    "https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png";

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <NavLink to="/" className="logo">
            React Library
          </NavLink>

          <nav className={`nav ${menuOpen ? "show" : ""}`}>
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/my-books" onClick={() => setMenuOpen(false)}>
              My Books
            </NavLink>
            <NavLink to="/aboutus" onClick={() => setMenuOpen(false)}>
              About
            </NavLink>
          </nav>

          <div className="profile" ref={dropdownRef}>
            <button
              className="profile-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img src={userImage} alt="user" />
            </button>

            {dropdownOpen && (
              <div className="dropdown">
                {isAuth ? (
                  <>
                    <div className="dropdown-user">
                      <strong>{userName}</strong>
                      <span>{user?.email}</span>
                    </div>

                    <NavLink to="/myprofile">My Profile</NavLink>
                    <NavLink to="/my-books">My Library</NavLink>

                    <button onClick={onLogout} className="logout">
                      Logout
                    </button>
                  </>
                ) : (
                  <NavLink to="/login">Sign In</NavLink>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <style>{`
        .header {
          position: sticky;
          top: 0;
          background: white;
          border-bottom: 1px solid #e5e7eb;
          z-index: 1000;
        }

        .header-inner {
          max-width: 1200px;
          margin: auto;
          padding: 0 1rem;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 1.3rem;
          font-weight: 800;
          text-decoration: none;
          color: #111827;
        }

        .menu-btn {
          display: none;
          font-size: 1.5rem;
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav {
          display: flex;
          gap: 1.5rem;
        }

        .nav a {
          text-decoration: none;
          font-weight: 600;
          color: #4b5563;
        }

        .nav a.active {
          color: #6366f1;
        }

        .profile {
          position: relative;
        }

        .profile-btn {
          background: none;
          border: none;
          cursor: pointer;
        }

        .profile-btn img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        .dropdown {
          position: absolute;
          right: 0;
          top: 110%;
          width: 200px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          padding: 0.75rem;
        }

        .dropdown a,
        .dropdown button {
          display: block;
          width: 100%;
          padding: 0.6rem;
          border-radius: 6px;
          text-align: left;
          border: none;
          background: none;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .dropdown a:hover,
        .dropdown button:hover {
          background: #f1f5f9;
        }

        .dropdown-user {
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .dropdown-user span {
          font-size: 0.8rem;
          color: #6b7280;
        }

        .logout {
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .menu-btn {
            display: block;
          }

          .nav {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            display: none;
          }

          .nav.show {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}

export default UserHeader;
