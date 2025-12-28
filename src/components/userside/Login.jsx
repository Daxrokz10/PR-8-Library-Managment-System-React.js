import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let errs = {};

    if (!formData.email?.trim()) {
      errs.email = "Email is required";
    }

    if (!formData.password?.trim()) {
      errs.password = "Password is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.get(
        `http://localhost:3000/users?email=${encodeURIComponent(formData.email.trim())}&password=${encodeURIComponent(formData.password.trim())}`
      );
      const user = res.data[0];
      if (!user) {
        setErrors({
          email: "Invalid email or password",
          password: "Invalid email or password",
        });
        return;
      }
      sessionStorage.setItem("isAuth", "true");
      sessionStorage.setItem("currentUser", JSON.stringify(user));
      navigate("/");
    } catch (err) {
      setErrors({ email: "Login failed. Try again." });
    }
  };

  return (
    <>
      <div className="login-page">
        {/* Background Decoration */}
        <div className="bg-decoration">
          <div className="bg-shape shape-1"></div>
          <div className="bg-shape shape-2"></div>
          <div className="bg-shape shape-3"></div>
        </div>

        {/* Main Login Card */}
        <div className="login-container">
          <div className="login-card">
            {/* Header Section */}
            <div className="login-header">
              <div className="logo-container">
                <h1 className="logo-text">Digital Library</h1>
              </div>
              <div className="welcome-text">
                <h2 className="welcome-title">Welcome Back</h2>
                <p className="welcome-subtitle">
                  Sign in to access your library account
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} noValidate className="login-form">
              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">Email Address :</label>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <div className="label-row">
                  <label className="form-label">Password :</label>
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    name="password"
                    className={`form-input ${errors.password ? "error" : ""}`}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                Log In
              </button>

              {/* Signup Link */}
              <div className="signup-section">
                <p className="signup-text">
                  Don't have an account?
                  <Link to="/signup" className="signup-link">
                    Create Account
                  </Link>
                </p>
                <p className="admin-text">
                  Are you an admin?
                  <Link to="/admin-login" className="admin-link">
                    Admin Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        /* =====================
           GLOBAL STYLES
        ===================== */
        :root {
          --primary-color: #6366f1;
          --primary-light: #818cf8;
          --primary-dark: #4f46e5;
          --secondary-color: #f1f5f9;
          --text-color: #1e293b;
          --text-light: #64748b;
          --success-color: #10b981;
          --danger-color: #ef4444;
          --warning-color: #f59e0b;
          --card-bg: #ffffff;
          --shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          --shadow-hover: 0 30px 60px rgba(0, 0, 0, 0.12);
          --radius: 20px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* =====================
           PAGE LAYOUT
        ===================== */
        .login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, 
            rgba(99, 102, 241, 0.05) 0%, 
            rgba(139, 92, 246, 0.05) 50%, 
            rgba(236, 72, 153, 0.05) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Background Decoration */
        .bg-decoration {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .bg-shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          opacity: 0.1;
          filter: blur(40px);
        }

        .shape-1 {
          width: 400px;
          height: 400px;
          top: -200px;
          right: -200px;
        }

        .shape-2 {
          width: 300px;
          height: 300px;
          bottom: -150px;
          left: -150px;
        }

        .shape-3 {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 10%;
        }

        /* =====================
           MAIN CONTAINER
        ===================== */
        .login-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 480px;
          animation: fadeInUp 0.6s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =====================
           LOGIN CARD
        ===================== */
        .login-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        /* =====================
           HEADER SECTION
        ===================== */
        .login-header {
          padding: 2.5rem 2.5rem 1.5rem;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          color: white;
          text-align: center;
        }

        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          font-size: 2.5rem;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .logo-text {
          font-size: 1.8rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin: 0;
        }

        .welcome-text {
          margin-top: 1rem;
        }

        .welcome-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .welcome-subtitle {
          font-size: 1rem;
          opacity: 0.9;
          margin: 0;
        }

        /* =====================
           LOGIN FORM
        ===================== */
        .login-form {
          padding: 2.5rem;
        }

        /* Form Groups */
        .form-group {
          margin-bottom: 1.75rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-color);
          margin-bottom: 0.5rem;
        }

        .label-icon {
          font-size: 1rem;
        }

        /* Input Containers */
        .input-container {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1.25rem 1rem 3rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          color: var(--text-color);
          background: var(--card-bg);
          transition: var(--transition);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
        }

        .form-input.error {
          border-color: var(--danger-color);
          animation: shake 0.3s ease;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          color: var(--text-light);
          pointer-events: none;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .forgot-link {
          color: var(--primary-color);
          font-size: 0.9rem;
          font-weight: 500;
          text-decoration: none;
          transition: var(--transition);
        }

        .forgot-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        /* Error Messages */
        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--danger-color);
          font-size: 0.85rem;
          font-weight: 500;
          margin-top: 0.5rem;
        }

        .error-icon {
          font-size: 0.9rem;
        }

        /* Form Options */
        .form-options {
          margin: 2rem 0;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          margin-bottom: 1rem;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          border: 2px solid #e2e8f0;
          border-radius: 4px;
          cursor: pointer;
          transition: var(--transition);
        }

        .checkbox-input:checked {
          background-color: var(--primary-color);
          border-color: var(--primary-color);
        }

        .checkbox-label {
          font-size: 0.9rem;
          color: var(--text-light);
        }

        .terms-text {
          font-size: 0.85rem;
          color: var(--text-light);
          line-height: 1.5;
          margin: 0;
        }

        .terms-link {
          color: var(--primary-color);
          font-weight: 500;
          text-decoration: none;
          margin: 0 0.25rem;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          color: white;
          border: none;
          padding: 1rem 1.5rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: var(--transition);
          margin: 1rem 0;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin: 2rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: #e2e8f0;
        }

        .divider-text {
          color: var(--text-light);
          font-size: 0.9rem;
          font-weight: 500;
        }

        /* Alternative Login */
        .alternative-login {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .alt-login-btn {
          flex: 1;
          padding: 0.9rem 1.5rem;
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          background: var(--card-bg);
          color: var(--text-color);
          font-size: 0.95rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: var(--transition);
        }

        .alt-login-btn:hover {
          border-color: var(--primary-color);
          transform: translateY(-2px);
        }

        .google-btn:hover {
          background: #f8fafc;
        }

        .github-btn:hover {
          background: #f8fafc;
        }

        .alt-icon {
          font-size: 1.1rem;
        }

        /* Signup Section */
        .signup-section {
          text-align: center;
          margin: 2rem 0;
        }

        .signup-text,
        .admin-text {
          font-size: 0.95rem;
          color: var(--text-light);
          margin: 0.5rem 0;
        }

        .signup-link,
        .admin-link {
          color: var(--primary-color);
          font-weight: 600;
          text-decoration: none;
          margin-left: 0.5rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .signup-link:hover,
        .admin-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        .signup-icon,
        .admin-icon {
          font-size: 1rem;
        }

        /* Security Note */
        .security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem;
          background: var(--secondary-color);
          border-radius: 10px;
          margin-top: 2rem;
        }

        .security-icon {
          font-size: 1rem;
          color: var(--success-color);
        }

        .security-text {
          font-size: 0.85rem;
          color: var(--text-light);
          font-weight: 500;
        }

        /* =====================
           STATS SECTION
        ===================== */
        .stats-section {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border-radius: var(--radius);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .stat-item {
          text-align: center;
          flex: 1;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--primary-color);
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--text-light);
          font-weight: 500;
        }

        /* =====================
           RESPONSIVE DESIGN
        ===================== */
        @media (max-width: 768px) {
          .login-page {
            padding: 1rem;
          }
          
          .login-container {
            max-width: 100%;
          }
          
          .login-header {
            padding: 2rem 1.5rem 1rem;
          }
          
          .login-form {
            padding: 2rem 1.5rem;
          }
          
          .logo-text {
            font-size: 1.5rem;
          }
          
          .welcome-title {
            font-size: 1.5rem;
          }
          
          .alternative-login {
            flex-direction: column;
          }
          
          .stats-section {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 576px) {
          .login-header {
            padding: 1.5rem 1rem 1rem;
          }
          
          .login-form {
            padding: 1.5rem 1rem;
          }
          
          .logo-container {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .logo-text {
            font-size: 1.3rem;
          }
          
          .form-input {
            padding-left: 2.5rem;
          }
        }

        /* =====================
           REDUCED MOTION
        ===================== */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default Login;
