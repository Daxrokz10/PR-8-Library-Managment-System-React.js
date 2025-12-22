/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
      setForm({
        username: storedUser.username || "",
        email: storedUser.email || "",
        image: storedUser.image || "",
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h4>Please login to view your profile</h4>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      username: form.username,
      name: form.name,
      email: form.email,
      image: form.image,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUser(updatedUser);
    setEditMode(false);

    window.dispatchEvent(new Event("profileUpdated"));

    navigate("/");
  };

  const handleCancel = () => {
    setForm({
      username: user.username || "",
      email: user.email || "",
      image: user.image || "",
    });
    setEditMode(false);
  };

  return (
    <>
      <div className="container mt-3 mb-3">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="profile-card">
              <div className="card-header pt-0">
                <div className="header-content">
                  <div className="profile-icon">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <h3 className="card-title">Profile Settings</h3>
                  <p className="card-subtitle">
                    Manage your account information
                  </p>
                </div>
              </div>

              <div className="card-body pt-3">
                {/* Profile Image */}
                <div className="avatar-section">
                  <div className="avatar-wrapper">
                    <img
                      src={
                        form.image ||
                        "https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
                      }
                      alt="Profile"
                      className="profile-avatar"
                    />
                    {editMode && (
                      <label className="avatar-upload-btn">
                        <i className="fas fa-camera"></i>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Username */}
                <div className="form-group">
                  <div className="form-label-wrapper">
                    <i className="fas fa-user"></i>
                    <label className="form-label">Username</label>
                  </div>
                  {editMode ? (
                    <input
                      type="text"
                      name="username"
                      className="form-input"
                      value={form.username}
                      onChange={handleChange}
                      placeholder="Enter username"
                    />
                  ) : (
                    <div className="display-field">
                      <span>{user.username}</span>
                      <i className="fas fa-pen edit-icon"></i>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <div className="form-label-wrapper">
                    <i className="fas fa-envelope"></i>
                    <label className="form-label">Email Address</label>
                  </div>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  ) : (
                    <div className="display-field">
                      <span>{user.email}</span>
                      <i className="fas fa-pen edit-icon"></i>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                  {editMode ? (
                    <>
                      <button className="btn btn-save" onClick={handleSave}>
                        <i className="fas fa-check"></i>
                        Save Changes
                      </button>
                      <button className="btn btn-cancel" onClick={handleCancel}>
                        <i className="fas fa-times"></i>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-edit"
                      onClick={() => setEditMode(true)}
                    >
                      <i className="fas fa-edit"></i>
                      Edit Profile
                    </button>
                  )}
                  {/* Home Button */}
                  <button
                    className="btn btn-home"
                    onClick={() => navigate("/")}
                  >
                    <i className="fas fa-home"></i>
                    Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        /* =====================
           BASE STYLES
        ===================== */
        :root {
          --primary: #6366f1;
          --primary-light: #818cf8;
          --secondary: #f1f5f9;
          --text: #1e293b;
          --text-light: #64748b;
          --border: #e2e8f0;
          --card-bg: #ffffff;
          --success: #10b981;
          --danger: #ef4444;
          --shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          --radius: 16px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
        }

        .container {
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =====================
           PROFILE CARD
        ===================== */
        .profile-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          max-width: 90vh;
          
        }

        .profile-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
        }

        .card-header {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          padding: 32px 40px;
          color: white;
          text-align: center;
        }

        .header-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .profile-icon {
          font-size: 48px;
          opacity: 0.9;
        }

        .card-title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: -0.5px;
          margin: 0;
        }

        .card-subtitle {
          font-size: 14px;
          opacity: 0.9;
          margin: 0;
        }

        .card-body {
          padding: 40px;
        }

        /* =====================
           AVATAR SECTION
        ===================== */
        .avatar-section {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        .avatar-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .profile-avatar {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--secondary);
          transition: transform 0.3s ease, border-color 0.3s ease;
        }

        .avatar-wrapper:hover .profile-avatar {
          transform: scale(1.05);
          border-color: var(--primary-light);
        }

        .avatar-upload-btn {
          position: absolute;
          bottom: 0;
          right: 0;
          background: var(--primary);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .avatar-upload-btn:hover {
          background: var(--primary-light);
          transform: scale(1.1);
        }

        /* =====================
           FORM STYLES
        ===================== */
        .form-group {
          margin-bottom: 28px;
        }

        .form-label-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .form-label-wrapper i {
          color: var(--primary);
          font-size: 16px;
          width: 20px;
        }

        .form-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .form-input {
          width: 100%;
          padding: 14px 20px;
          border: 2px solid var(--border);
          border-radius: 12px;
          font-size: 16px;
          color: var(--text);
          background: var(--card-bg);
          transition: all 0.3s ease;
        }

        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .form-input::placeholder {
          color: #94a3b8;
        }

        .display-field {
          padding: 14px 20px;
          border: 2px solid transparent;
          border-radius: 12px;
          background: var(--secondary);
          font-size: 16px;
          color: var(--text);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.3s ease;
        }

        .display-field:hover {
          background: #e2e8f0;
        }

        .edit-icon {
          color: var(--text-light);
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .display-field:hover .edit-icon {
          opacity: 1;
        }

        /* =====================
           BUTTONS
        ===================== */
        .action-buttons {
          display: flex;
          gap: 16px;
          margin-top: 40px;
        }

        .btn {
          flex: 1;
          padding: 16px 24px;
          border: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          letter-spacing: 0.3px;
        }

        .btn i {
          font-size: 18px;
        }
        
        .btn-home {
          background: linear-gradient(135deg, var(--success) 0%, #34d399 100%);
          color: white;
        }
        
        .btn-home:hover{
        transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
        }

        .btn-save {
          background: #c4e700dc;
          color: white;
        }

        .btn-save:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.2);
          background: #cde304ff;
        }

        .btn-cancel {
          background: linear-gradient(135deg, var(--secondary) 0%, #e2e8f0 100%);
          color: var(--text-light);
        }

        .btn-cancel:hover {
          background: #eef0e2ff;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
        }

        .btn-edit {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          color: white;
        }

        .btn-edit:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
        }

        /* =====================
           RESPONSIVE DESIGN
        ===================== */
        @media (max-width: 768px) {
          .container {
            padding: 20px;
          }

          .card-header {
            padding: 24px 20px;
          }

          .card-body {
            padding: 30px 20px;
          }

          .card-title {
            font-size: 20px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .avatar-wrapper {
            width: 100px;
            height: 100px;
          }
        }

        @media (max-width: 576px) {
          .card-header {
            padding: 20px 16px;
          }

          .card-body {
            padding: 24px 16px;
          }

          .form-input,
          .display-field {
            padding: 12px 16px;
            font-size: 15px;
          }

          .btn {
            padding: 14px 20px;
            font-size: 15px;
          }
        }

        /* =====================
           UTILITIES
        ===================== */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}

export default MyProfile;
