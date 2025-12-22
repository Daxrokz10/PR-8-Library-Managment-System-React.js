import React, { useState } from "react";

function AddBook({ handleChange, handleSubmit, book }) {
  const [errors, setErrors] = useState({});

  const categories = [
    "Novel",
    "Science",
    "History",
    "Biography",
    "Technology",
    "Art",
    "Music",
    "Sports",
  ];

  const isEdit = !!book.id;

  const validate = () => {
    const newErrors = {};

    if (!book.name?.trim()) newErrors.name = "Book name is required";
    if (!book.category) newErrors.category = "Category is required";
    if (!book.author?.trim()) newErrors.author = "Author name is required";

    if (!book.count) {
      newErrors.count = "Stock is required";
    } else if (book.count < 1 || book.count > 10) {
      newErrors.count = "Stock must be between 1 and 10";
    }

    if (!book.image?.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!/^https?:\/\/.+/i.test(book.image)) {
      newErrors.image = "Enter a valid image URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    handleSubmit(e);
  };

  const onChange = (e) => {
    handleChange(e);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <>
      <div className="addbook-page mt-5">
        <div className="addbook-container">
          {/* Header Section */}
          <div className="addbook-header">
            <div className="header-content">
              <h1 className="page-title">
                {isEdit ? "Edit Book" : "Add New Book"}
              </h1>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="addbook-card">
            <div className="card-header">
              <div className="card-title">
                {isEdit ? "Edit Book Details" : "Book Information"}
              </div>
            </div>

            <form onSubmit={onSubmit} noValidate className="addbook-form">
              {/* Book Name Field */}
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Book Name :</label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    name="name"
                    value={book.name || ""}
                    onChange={onChange}
                    className={`form-input ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter book title..."
                    autoComplete="off"
                  />
                  {errors.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                </div>
              </div>

              {/* Category Field */}
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Book Category :</label>
                </div>
                <div className="select-container">
                  <select
                    name="category"
                    value={book.category || ""}
                    onChange={onChange}
                    className={`form-select ${
                      errors.category ? "is-invalid" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select a category...
                    </option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <span className="select-arrow">▼</span>
                </div>
                {errors.category && (
                  <div className="error-message">{errors.category}</div>
                )}
              </div>

              {/* Author Field */}
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Book Author :</label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    name="author"
                    value={book.author || ""}
                    onChange={onChange}
                    className={`form-input ${
                      errors.author ? "is-invalid" : ""
                    }`}
                    placeholder="Enter author name..."
                    autoComplete="off"
                  />
                  {errors.author && (
                    <div className="error-message">{errors.author}</div>
                  )}
                </div>
              </div>

              {/* Stock Field */}
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Book Stock :</label>
                </div>
                <div className="input-container">
                  <input
                    type="number"
                    name="count"
                    min={1}
                    max={5}
                    value={book.count || ""}
                    onChange={onChange}
                    className={`form-input ${errors.count ? "is-invalid" : ""}`}
                    placeholder="Enter stock quantity (1-5)..."
                  />
                </div>
                {errors.count && (
                  <div className="error-message">{errors.count}</div>
                )}
              </div>

              {/* Image URL Field */}
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Book Cover Image URL :</label>
                </div>
                <div className="input-container">
                  <input
                    type="url"
                    name="image"
                    value={book.image || ""}
                    onChange={onChange}
                    className={`form-input ${errors.image ? "is-invalid" : ""}`}
                    placeholder="https://example.com/book-cover.jpg"
                    autoComplete="off"
                  />
                  {errors.image && (
                    <div className="error-message">{errors.image}</div>
                  )}
                </div>
                {book.image && !errors.image && (
                  <div className="image-preview">
                    <div className="preview-label">Preview:</div>
                    <img
                      src={book.image}
                      alt="Book cover preview"
                      className="preview-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150x200/3b82f6/ffffff?text=📚";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <span className="btn-text">
                    {isEdit ? "Update Book" : "Add Book to Library"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <style>{`
        /* =====================
           GLOBAL VARIABLES
        ===================== */
        :root {
          --primary: #ab3bf6ff;
          --primary-light: #60a5fa;
          --primary-dark: #1d4ed8;
          --success: #10b981;
          --danger: #ef4444;
          --warning: #f59e0b;
          --info: #06b6d4;
          --light: #f8fafc;
          --dark: #1e293b;
          --gray: #64748b;
          --gray-light: #e2e8f0;
          --gray-dark: #334155;
          --card-bg: #ffffff;
          --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);
          --shadow-md: 0 4px 20px rgba(0, 0, 0, 0.08);
          --shadow-lg: 0 10px 40px rgba(0, 0, 0, 0.12);
          --radius-sm: 8px;
          --radius-md: 12px;
          --radius-lg: 16px;
          --radius-xl: 20px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* =====================
           PAGE CONTAINER
        ===================== */
        .addbook-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          padding: 24px;
          animation: fadeIn 0.5s ease;
          margin-left: 20px;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .addbook-container {
          max-width: 500px;
          margin: 0 auto;
        }

        /* =====================
           HEADER SECTION
        ===================== */
        .addbook-header {
          margin-bottom: 32px;
        }

        .header-content {
          text-align: center;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--dark);
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
        }

        .title-icon {
          font-size: 2.5rem;
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .page-subtitle {
          color: var(--gray);
          font-size: 1.1rem;
          max-width: 600px;
          margin: 0 auto 24px;
          line-height: 1.5;
        }

        .header-stats {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 10px 20px;
          border-radius: 50px;
          box-shadow: var(--shadow-sm);
          font-weight: 500;
          color: var(--gray-dark);
        }

        .stat-icon {
          font-size: 1rem;
        }

        /* =====================
           FORM CARD
        ===================== */
        .addbook-card {
          background: var(--card-bg);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          margin-bottom: 32px;
        }

        .card-header {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          padding: 24px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .card-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .card-icon {
          font-size: 1.5rem;
        }

        .card-badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 500;
          backdrop-filter: blur(10px);
        }

        /* =====================
           FORM STYLES
        ===================== */
        .addbook-form {
          padding: 32px;
        }

        .form-group {
          margin-bottom: 28px;
        }

        .form-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .form-label {
          font-weight: 600;
          color: var(--dark);
          font-size: 0.95rem;
        }

        .form-required {
          font-size: 0.8rem;
          color: var(--danger);
          font-weight: 500;
        }

        .input-container,
        .select-container {
          position: relative;
        }

        .input-icon,
        .select-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1rem;
          color: var(--gray);
          z-index: 1;
        }

        .form-input,
        .form-select {
          width: 100%;
          padding: 14px 16px 14px 48px;
          border: 2px solid var(--gray-light);
          border-radius: var(--radius-md);
          font-size: 1rem;
          color: var(--dark);
          background: white;
          transition: var(--transition);
        }

        .form-input:focus,
        .form-select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
        }

        .form-input.is-invalid,
        .form-select.is-invalid {
          border-color: var(--danger);
        }

        .form-input::placeholder {
          color: var(--gray);
        }

        /* Select Specific Styles */
        .select-container {
          position: relative;
        }

        .form-select {
          appearance: none;
          cursor: pointer;
        }

        .select-arrow {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--gray);
          pointer-events: none;
        }

        /* Stock Range */
        .stock-range {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 12px;
          padding: 8px 16px;
          background: var(--gray-light);
          border-radius: var(--radius-sm);
        }

        .range-min,
        .range-max {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--gray-dark);
          min-width: 20px;
        }

        .range-track {
          flex: 1;
          height: 6px;
          background: white;
          border-radius: 3px;
          overflow: hidden;
        }

        .range-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--primary-light), var(--primary));
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        /* Error Messages */
        .error-message {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--danger);
          font-size: 0.85rem;
          margin-top: 6px;
          padding: 8px 12px;
          background: #fee2e2;
          border-radius: var(--radius-sm);
        }

        .error-icon {
          font-size: 0.9rem;
        }

        /* Form Hints */
        .form-hint {
          font-size: 0.85rem;
          color: var(--gray);
          margin-top: 6px;
          padding-left: 4px;
        }

        /* Image Preview */
        .image-preview {
          margin-top: 16px;
          padding: 16px;
          background: var(--light);
          border-radius: var(--radius-md);
          border: 2px dashed var(--gray-light);
        }

        .preview-label {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--gray-dark);
          margin-bottom: 12px;
        }

        .preview-image {
          width: 120px;
          height: 160px;
          object-fit: cover;
          border-radius: var(--radius-sm);
          box-shadow: var(--shadow-sm);
          border: 2px solid white;
        }

        /* =====================
           FORM ACTIONS
        ===================== */
        .form-actions {
          margin-top: 40px;
          text-align: center;
        }

        .submit-btn {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          border: none;
          padding: 16px 40px;
          border-radius: var(--radius-lg);
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: var(--transition);
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.4);
        }

        .submit-btn:active {
          transform: translateY(0);
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        .form-note {
          margin-top: 16px;
          font-size: 0.85rem;
          color: var(--gray);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .note-icon {
          font-size: 0.9rem;
        }

        /* =====================
           RESPONSIVE DESIGN
        ===================== */
        @media (max-width: 768px) {
          .addbook-page {
            padding: 16px;
          }
          
          .page-title {
            font-size: 2rem;
            flex-direction: column;
            gap: 8px;
          }
          
          .title-icon {
            font-size: 2rem;
          }
          
          .page-subtitle {
            font-size: 1rem;
          }
          
          .card-header {
            flex-direction: column;
            gap: 12px;
            text-align: center;
            padding: 20px 24px;
          }
          
          .addbook-form {
            padding: 24px;
          }
          
          .header-stats {
            flex-direction: column;
            align-items: center;
          }
          
          .stat-item {
            width: 100%;
            max-width: 300px;
            justify-content: center;
          }
        }

        @media (max-width: 576px) {
          .page-title {
            font-size: 1.75rem;
          }
          
          .card-title {
            font-size: 1.25rem;
          }
          
          .addbook-form {
            padding: 20px;
          }
          
          .form-input,
          .form-select {
            padding: 12px 16px 12px 44px;
            font-size: 0.95rem;
          }
          
          .input-icon,
          .select-icon {
            left: 12px;
          }
          
          .submit-btn {
            width: 100%;
            justify-content: center;
            padding: 14px 24px;
          }
          
          .stock-range {
            flex-direction: column;
            gap: 8px;
          }
        }

        @media (max-width: 400px) {
          .page-title {
            font-size: 1.5rem;
          }
          
          .card-header {
            padding: 16px 20px;
          }
          
          .addbook-form {
            padding: 16px;
          }
        }

        /* =====================
           ACCESSIBILITY
        ===================== */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }

        /* Focus styles */
        .form-input:focus,
        .form-select:focus,
        .submit-btn:focus {
          outline: 2px solid var(--primary);
          outline-offset: 2px;
        }

        /* =====================
           VALIDATION STATES
        ===================== */
        .form-input:valid:not(:placeholder-shown):not(.is-invalid),
        .form-select:valid:not(:placeholder-shown):not(.is-invalid) {
          border-color: var(--success);
        }

        .form-input:valid:not(:placeholder-shown):not(.is-invalid) + .input-icon,
        .form-select:valid:not(:placeholder-shown):not(.is-invalid) + .select-icon {
          color: var(--success);
        }
      `}</style>
    </>
  );
}

export default AddBook;
