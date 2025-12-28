import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let errs = {};

    if (!formData.username?.trim()) {
      errs.username = "Username is required";
    }

    if (!formData.email?.trim()) {
      errs.email = "Email is required";
    }

    if (!formData.password?.trim()) {
      errs.password = "Password is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // Check if user exists
      const res = await axios.get(
        `http://localhost:3000/users?email=${encodeURIComponent(formData.email.trim())}`
      );
      if (res.data.length > 0) {
        setErrors({ email: "User already exists with this email" });
        return;
      }
      const newUser = {
        ...formData,
        role: "User",
        isActive: true,
        myBooks: [],
      };
      await axios.post("http://localhost:3000/users", newUser);
      navigate("/login");
    } catch (err) {
      setErrors({ email: "Signup failed. Try again." });
    }
  };

  return (
    <>
      <div className="signup-page">
        {/* Background Effects */}
        <div className="bg-effects">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-circle circle-3"></div>
          <div className="bg-blur"></div>
        </div>

        {/* Main Container */}
        <div className="signup-container">
          {/* Signup Card */}
          <div className="signup-card">
            {/* Header Section */}
            <div className="signup-header">
              <div className="header-content">
                <div className="logo-section">
                  <h1 className="logo-text">Join Our Library</h1>
                </div>
                <div className="welcome-section">
                  <h2 className="welcome-title">Create Your Account</h2>
                  <p className="welcome-subtitle">
                    Start your reading journey with thousands of books
                  </p>
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} noValidate className="signup-form">
              {/* Username Field */}
              <div className="form-group">
                <label className="form-label">Username :</label>
                <div className="input-container">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`form-input ${errors.username ? "error" : ""}`}
                    placeholder="Choose a username"
                    autoComplete="username"
                  />
                </div>
                {errors.username && (
                  <div className="error-message">{errors.username}</div>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">Email Address :</label>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? "error" : ""}`}
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
                <label className="form-label">Password :</label>
                <div className="input-container">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                  />
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              {/* Submit Button */}
              <button type="submit" className="submit-btn">
                Create Account
              </button>
              {/* Login Link */}
              <div className="login-section">
                <p className="login-text">
                  Already have an account?
                  <Link to="/login" className="login-link">
                    Log In
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
          --accent-color: #8b5cf6;
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
        .signup-page {
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

        /* Background Effects */
        .bg-effects {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .bg-circle {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          opacity: 0.1;
          filter: blur(60px);
          animation: float 20s infinite linear;
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .circle-1 {
          width: 400px;
          height: 400px;
          top: -150px;
          left: -150px;
          animation-delay: 0s;
        }

        .circle-2 {
          width: 300px;
          height: 300px;
          bottom: -100px;
          right: -100px;
          animation-delay: -7s;
        }

        .circle-3 {
          width: 200px;
          height: 200px;
          top: 50%;
          left: 70%;
          animation-delay: -14s;
        }

        .bg-blur {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          backdrop-filter: blur(40px);
          opacity: 0.5;
        }

        /* =====================
           MAIN CONTAINER
        ===================== */
        .signup-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 500px;
          animation: slideUp 0.6s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =====================
           SIGNUP CARD
        ===================== */
        .signup-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        /* =====================
           HEADER SECTION
        ===================== */
        .signup-header {
          padding: 2.5rem 2.5rem 1.5rem;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
        }

        .header-content {
          text-align: center;
        }

        .logo-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          font-size: 2.8rem;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
        }

        .logo-text {
          font-size: 1.9rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .welcome-section {
          margin-top: 1rem;
        }

        .welcome-title {
          font-size: 1.9rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .welcome-subtitle {
          font-size: 1.05rem;
          opacity: 0.9;
          margin: 0;
          font-weight: 400;
        }

        /* =====================
           SIGNUP FORM
        ===================== */
        .signup-form {
          padding: 2.5rem;
        }

        /* Form Groups */
        .form-group {
          margin-bottom: 2rem;
          position: relative;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-color);
          margin-bottom: 0.75rem;
        }

        .label-icon {
          font-size: 1.1rem;
        }

        .label-required {
          color: var(--danger-color);
          margin-left: 0.25rem;
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
          font-size: 1.1rem;
          color: var(--text-light);
          pointer-events: none;
        }

        /* Input Hints */
        .input-hint {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--text-light);
          margin-top: 0.5rem;
        }

        .hint-icon {
          font-size: 0.9rem;
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

        /* Password Requirements */
        .password-requirements {
          margin-top: 1rem;
          padding: 1rem;
          background: var(--secondary-color);
          border-radius: 10px;
        }

        .requirement-title {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-color);
          margin-bottom: 0.75rem;
        }

        .requirement-icon {
          font-size: 1rem;
        }

        .requirements-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .requirement-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: var(--text-light);
          margin-bottom: 0.5rem;
        }

        .requirement-item.met {
          color: var(--success-color);
        }

        .item-icon {
          font-size: 0.9rem;
        }

        /* Terms Section */
        .terms-section {
          margin: 2rem 0;
        }

        .checkbox-container {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
        }

        .checkbox-input {
          display: none;
        }

        .checkbox-custom {
          width: 20px;
          height: 20px;
          border: 2px solid #e2e8f0;
          border-radius: 5px;
          flex-shrink: 0;
          position: relative;
          transition: var(--transition);
          margin-top: 2px;
        }

        .checkbox-input:checked + .checkbox-custom {
          background: var(--primary-color);
          border-color: var(--primary-color);
        }

        .checkbox-input:checked + .checkbox-custom::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }

        .checkbox-text {
          font-size: 0.9rem;
          color: var(--text-color);
          line-height: 1.5;
        }

        .terms-link {
          color: var(--primary-color);
          font-weight: 600;
          text-decoration: none;
          margin: 0 0.25rem;
        }

        .terms-link:hover {
          text-decoration: underline;
        }

        /* Submit Button */
        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          border: none;
          padding: 1.1rem 1.5rem;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: var(--transition);
          margin: 1.5rem 0;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(99, 102, 241, 0.3);
        }

        .btn-icon {
          font-size: 1.3rem;
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

        /* Login Link */
        .login-section {
          text-align: center;
          margin: 2rem 0;
          padding: 1.5rem;
          background: var(--secondary-color);
          border-radius: 12px;
        }

        .login-text {
          font-size: 1rem;
          color: var(--text-color);
          margin: 0;
        }

        .login-link {
          color: var(--primary-color);
          font-weight: 700;
          text-decoration: none;
          margin-left: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .login-link:hover {
          color: var(--primary-dark);
          text-decoration: underline;
        }

        .link-icon {
          font-size: 1rem;
        }

        /* =====================
           STATS SECTION
        ===================== */
        .stats-section {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: var(--radius);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: var(--shadow);
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
          .signup-page {
            padding: 1rem;
          }
          
          .signup-container {
            max-width: 100%;
          }
          
          .signup-header {
            padding: 2rem 1.5rem 1rem;
          }
          
          .signup-form {
            padding: 2rem 1.5rem;
          }
          
          .logo-text {
            font-size: 1.6rem;
          }
          
          .welcome-title {
            font-size: 1.6rem;
          }
          
          .social-signup {
            flex-direction: column;
          }
          
          .stats-section {
            flex-direction: column;
            gap: 1rem;
          }
        }

        @media (max-width: 576px) {
          .signup-header {
            padding: 1.5rem 1rem 1rem;
          }
          
          .signup-form {
            padding: 1.5rem 1rem;
          }
          
          .logo-section {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .logo-text {
            font-size: 1.4rem;
          }
          
          .form-input {
            padding-left: 2.5rem;
          }
          
          .benefits-section {
            padding: 1rem;
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
          
          .bg-circle {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

export default Signup;
