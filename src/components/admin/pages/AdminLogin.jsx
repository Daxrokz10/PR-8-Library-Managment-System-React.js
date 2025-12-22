import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let errs = {};

    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }

    if (!form.password.trim()) {
      errs.password = "Password is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      setErrors({
        email: "Invalid admin credentials",
        password: "Invalid admin credentials",
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="admin-login-page">
        {/* Background Effects */}
        <div className="admin-bg-effects">
          <div className="admin-bg-shape shape-1"></div>
          <div className="admin-bg-shape shape-2"></div>
          <div className="admin-bg-shape shape-3"></div>
          <div className="admin-bg-grid"></div>
        </div>

        {/* Main Container */}
        <div className="admin-login-container">
          {/* Admin Login Card */}
          <div className="admin-login-card">
            {/* Admin Header */}
            <div className="admin-header">
              <div className="admin-title-section">
                <h1 className="admin-title">Admin Access</h1>
                <p className="admin-subtitle">
                  Secure admin dashboard for library management
                </p>
              </div>
            </div>

            {/* Admin Login Form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="admin-login-form"
            >
              {/* Email Field */}
              <div className="form-group">
                <label className="form-label">Admin Email :</label>
                <div className="input-container">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@gmail.com"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label className="form-label">Admin Password :</label>
                <div className="input-container">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className={`form-input ${errors.password ? "error" : ""}`}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter admin password"
                    disabled={isLoading}
                  />
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="admin-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Authenticating...
                  </>
                ) : (
                  <>Access Admin Dashboard</>
                )}
              </button>
              <div className="password-note">
                Default: admin@gmail.com / admin123
              </div>
              {/* Back to User Login */}
              <div className="back-section">
                <NavLink to="/login" className="back-link">
                  <span className="back-icon">←</span>
                  Return to User Login
                </NavLink>
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
          --admin-primary: #0ea5e9;
          --admin-primary-dark: #0284c7;
          --admin-primary-light: #38bdf8;
          --admin-secondary: #1e293b;
          --admin-accent: #8b5cf6;
          --admin-danger: #dc2626;
          --admin-warning: #f59e0b;
          --admin-success: #10b981;
          --admin-bg: #f1f5f9;
          --admin-card-bg: #1e293b;
          --admin-text: #f1f5f9;
          --admin-text-light: #f1f5f9;
          --admin-border: #334155;
          --admin-shadow: 0 20px 40px rgba(70, 16, 16, 0.3);
          --admin-glow: 0 0 20px rgba(14, 165, 233, 0.3);
          --radius: 16px;
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
        .admin-login-page {
          min-height: 100vh;
          background: linear-gradient(135deg, var(--admin-bg), #f1f5f9);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        /* Background Effects */
        .admin-bg-effects {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .admin-bg-shape {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--admin-primary), var(--admin-accent));
          opacity: 0.1;
          filter: blur(60px);
          animation: adminFloat 25s infinite linear;
        }

        @keyframes adminFloat {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(40px, -40px) scale(1.2);
          }
          66% {
            transform: translate(-30px, 30px) scale(0.8);
          }
        }

        .shape-1 {
          width: 500px;
          height: 500px;
          top: -250px;
          right: -250px;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          bottom: -200px;
          left: -200px;
          animation-delay: -8s;
        }

        .shape-3 {
          width: 300px;
          height: 300px;
          top: 50%;
          left: 20%;
          animation-delay: -16s;
        }

        .admin-bg-grid {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            linear-gradient(rgba(14, 165, 233, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14, 165, 233, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
        }

        /* =====================
           MAIN CONTAINER
        ===================== */
        .admin-login-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 500px;
          animation: adminSlideIn 0.6s ease;
        }

        @keyframes adminSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* =====================
           ADMIN LOGIN CARD
        ===================== */
        .admin-login-card {
          background: var(--admin-card-bg);
          border-radius: var(--radius);
          box-shadow: var(--admin-shadow), var(--admin-glow);
          overflow: hidden;
          border: 1px solid var(--admin-border);
          backdrop-filter: blur(20px);
        }

        /* =====================
           ADMIN HEADER
        ===================== */
        .admin-header {
          padding: 2rem;
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(139, 92, 246, 0.1));
          border-bottom: 1px solid var(--admin-border);
        }

        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(14, 165, 233, 0.2);
          color: var(--admin-primary-light);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(14, 165, 233, 0.3);
        }

        .badge-icon {
          font-size: 1rem;
        }

        .admin-title-section {
          text-align: center;
        }

        .admin-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--admin-text);
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .title-icon {
          font-size: 1.8rem;
        }

        .admin-subtitle {
          font-size: 1rem;
          color: var(--admin-text-light);
          margin: 0;
        }

        /* =====================
           ADMIN LOGIN FORM
        ===================== */
        .admin-login-form {
          padding: 2rem;
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
          color: var(--admin-text);
          margin-bottom: 0.75rem;
        }

        .label-icon {
          font-size: 1.1rem;
        }

        .label-required {
          color: var(--admin-danger);
          margin-left: 0.25rem;
        }

        /* Input Containers */
        .input-container {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1.25rem 1rem 3rem;
          border: 2px solid var(--admin-border);
          border-radius: 12px;
          font-size: 1rem;
          color: var(--admin-text);
          background: rgba(255, 255, 255, 0.05);
          transition: var(--transition);
        }

        .form-input:focus {
          outline: none;
          border-color: var(--admin-primary);
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.15);
        }

        .form-input.error {
          border-color: var(--admin-danger);
          animation: adminShake 0.3s ease;
        }

        @keyframes adminShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }

        .form-input:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.1rem;
          color: var(--admin-text-light);
          pointer-events: none;
        }

        /* Error Messages */
        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--admin-danger);
          font-size: 0.85rem;
          font-weight: 500;
          margin-top: 0.5rem;
        }

        .error-icon {
          font-size: 0.9rem;
        }

        /* Input Hints */
        .input-hint,
        .password-note {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: var(--admin-text-light);
          margin-top: 0.5rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          border-left: 3px solid var(--admin-warning);
        }

        .hint-icon,
        .note-icon {
          font-size: 0.9rem;
        }

        .password-note {
          border-left-color: var(--admin-primary);
        }

        /* Security Check */
        .security-check {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 2rem 0;
          padding: 1rem;
          background: rgba(14, 165, 233, 0.05);
          border-radius: 12px;
          border: 1px solid rgba(14, 165, 233, 0.1);
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .checkbox-input {
          display: none;
        }

        .checkbox-custom {
          width: 18px;
          height: 18px;
          border: 2px solid var(--admin-border);
          border-radius: 4px;
          flex-shrink: 0;
          position: relative;
          transition: var(--transition);
        }

        .checkbox-input:checked + .checkbox-custom {
          background: var(--admin-primary);
          border-color: var(--admin-primary);
        }

        .checkbox-input:checked + .checkbox-custom::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 10px;
          font-weight: bold;
        }

        .checkbox-text {
          font-size: 0.9rem;
          color: var(--admin-text-light);
        }

        .security-level {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--admin-success);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .level-icon {
          font-size: 1rem;
        }

        /* Submit Button */
        .admin-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, var(--admin-primary), var(--admin-accent));
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
          position: relative;
          overflow: hidden;
        }

        .admin-submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(14, 165, 233, 0.4);
        }

        .admin-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-icon {
          font-size: 1.3rem;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 0.75rem;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Activity Section */
        .activity-section {
          margin: 2rem 0;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          border: 1px solid var(--admin-border);
        }

        .activity-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .activity-icon {
          font-size: 1.2rem;
          color: var(--admin-primary);
        }

        .activity-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--admin-text);
          margin: 0;
        }

        .activity-stats {
          display: flex;
          justify-content: space-between;
        }

        .activity-stat {
          text-align: center;
          flex: 1;
        }

        .stat-number {
          font-size: 1.2rem;
          font-weight: 800;
          color: var(--admin-primary);
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.85rem;
          color: var(--admin-text-light);
          font-weight: 500;
        }

        /* Admin Info */
        .admin-info {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: rgba(248, 113, 113, 0.05);
          border-radius: 12px;
          border-left: 4px solid var(--admin-danger);
          margin: 2rem 0;
        }

        .info-icon {
          font-size: 1.5rem;
          color: var(--admin-danger);
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
        }

        .info-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--admin-text);
          margin-bottom: 0.5rem;
        }

        .info-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .info-item {
          font-size: 0.9rem;
          color: var(--admin-text-light);
          margin-bottom: 0.25rem;
        }

        /* Back Section */
        .back-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--admin-border);
        }

        .back-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--admin-primary-light);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: var(--transition);
        }

        .back-link:hover {
          color: var(--admin-primary);
          text-decoration: underline;
        }

        .back-icon {
          font-size: 1rem;
        }

        .version-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--admin-text-light);
          font-size: 0.85rem;
          font-weight: 500;
        }

        .version-icon {
          font-size: 0.9rem;
        }

        /* =====================
           ADMIN FEATURES
        ===================== */
        .admin-features {
          margin-top: 2rem;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: var(--radius);
          border: 1px solid var(--admin-border);
        }

        .features-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--admin-text);
          margin-bottom: 1.5rem;
        }

        .features-icon {
          font-size: 1.3rem;
          color: var(--admin-primary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
        }

        .feature-card {
          text-align: center;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          transition: var(--transition);
        }

        .feature-card:hover {
          background: rgba(14, 165, 233, 0.1);
          transform: translateY(-3px);
        }

        .feature-icon {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: var(--admin-primary);
        }

        .feature-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--admin-text);
          margin-bottom: 0.25rem;
        }

        .feature-desc {
          font-size: 0.85rem;
          color: var(--admin-text-light);
          margin: 0;
        }

        /* =====================
           RESPONSIVE DESIGN
        ===================== */
        @media (max-width: 768px) {
          .admin-login-page {
            padding: 1rem;
          }
          
          .admin-login-container {
            max-width: 100%;
          }
          
          .admin-header,
          .admin-login-form {
            padding: 1.5rem;
          }
          
          .admin-title {
            font-size: 1.7rem;
          }
          
          .activity-stats {
            flex-direction: column;
            gap: 1rem;
          }
          
          .back-section {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }

        @media (max-width: 576px) {
          .admin-header,
          .admin-login-form {
            padding: 1.25rem;
          }
          
          .admin-title {
            font-size: 1.5rem;
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .title-icon {
            font-size: 1.5rem;
          }
          
          .form-input {
            padding-left: 2.5rem;
          }
          
          .security-check {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
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
          
          .admin-bg-shape {
            animation: none;
          }
          
          .loading-spinner {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}

export default AdminLogin;
