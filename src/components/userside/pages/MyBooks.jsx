/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserFooter from "../UserFooter";
import UserHeader from "../UserHeader";

function MyBooks({ handleUserLogout }) {
  const navigate = useNavigate();
  const [groupedBooks, setGroupedBooks] = useState([]);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth") === "true";
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!isAuth || !user) {
      navigate("/login", { replace: true });
      return;
    }

    const books = Array.isArray(user.myBooks) ? user.myBooks : [];

    const grouped = Object.values(
      books.reduce((acc, book) => {
        if (!acc[book.id]) {
          acc[book.id] = { ...book, qty: 1 };
        } else {
          acc[book.id].qty += 1;
        }
        return acc;
      }, {})
    );

    setGroupedBooks(grouped);
  }, []);

  const updateUserBooks = (updatedMyBooks) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUser = { ...user, myBooks: updatedMyBooks };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem(
      "users",
      JSON.stringify(
        users.map((u) => (u.email === user.email ? updatedUser : u))
      )
    );
  };

  const restoreBookCount = (bookId) => {
    const books = JSON.parse(localStorage.getItem("Books")) || [];
    const updated = books.map((b) =>
      b.id === bookId ? { ...b, count: b.count + 1 } : b
    );
    localStorage.setItem("Books", JSON.stringify(updated));
  };

  const handleRemoveOne = (bookId) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const myBooks = user.myBooks || [];

    const index = myBooks.findIndex((b) => b.id === bookId);
    if (index === -1) return;

    myBooks.splice(index, 1);
    restoreBookCount(bookId);
    updateUserBooks(myBooks);

    const regrouped = Object.values(
      myBooks.reduce((acc, book) => {
        if (!acc[book.id]) {
          acc[book.id] = { ...book, qty: 1 };
        } else {
          acc[book.id].qty += 1;
        }
        return acc;
      }, {})
    );

    setGroupedBooks(regrouped);
  };

  const handleRemoveAll = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const myBooks = user.myBooks || [];

    myBooks.forEach((b) => restoreBookCount(b.id));
    updateUserBooks([]);
    setGroupedBooks([]);
  };

  return (
    <>
      <UserHeader onLogout={handleUserLogout} />

      <div className="mybooks-container">
        <div className="mybooks-header">
          <div className="header-content">
            <div className="title-section">
              <h1 className="page-title">My Library</h1>
              <p className="page-subtitle">
                Manage your borrowed books collection
              </p>
            </div>

            <div className="header-stats">
              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-number">{groupedBooks.length}</div>
                  <div className="stat-label">Unique Books</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-number">
                    {groupedBooks.reduce((sum, book) => sum + book.qty, 0)}
                  </div>
                  <div className="stat-label">Total Copies</div>
                </div>
              </div>
            </div>
          </div>

          {groupedBooks.length > 0 && (
            <div className="header-actions">
              <button className="btn btn-remove-all" onClick={handleRemoveAll}>
                Clear All Books
              </button>
            </div>
          )}
        </div>

        <div className="mybooks-content">
          {groupedBooks.length > 0 ? (
            <>
              <div className="books-grid">
                {groupedBooks.map((book) => (
                  <div className="book-card" key={book.id}>
                    <div className="book-card-inner">
                      <div className="book-image-container">
                        <div className="book-quantity-badge">
                          <span className="quantity-text">x{book.qty}</span>
                        </div>
                        <img
                          src={book.image}
                          className="book-image"
                          alt={book.name}
                        />
                        <div className="book-overlay">
                          <div className="overlay-content">
                            <button
                              className="btn-return-book"
                              onClick={() => handleRemoveOne(book.id)}
                            >
                              Return Copy
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="book-info">
                        <h3 className="book-title">{book.name}</h3>

                        <div className="book-meta">
                          <div className="meta-item">
                            <span className="meta-icon">✍️</span>
                            <span className="meta-label">Author:</span>
                            <span className="meta-value">{book.author}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-icon">🏷️</span>
                            <span className="meta-label">Category:</span>
                            <span className="meta-value">{book.category}</span>
                          </div>
                        </div>

                        <div className="book-actions">
                          <button
                            className="btn btn-remove-one"
                            onClick={() => handleRemoveOne(book.id)}
                          >
                            Return Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-library">
              <div className="empty-content">
                <h3 className="empty-title">Your Library is Empty</h3>
                <p className="empty-description">
                  You haven't borrowed any books yet. Start exploring our
                  collection to add books to your library.
                </p>
                <button
                  className="btn btn-explore-books"
                  onClick={() => navigate("/")}
                >
                  Explore Books
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <UserFooter />
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
          --warning-color: #f59e0b;
          --danger-color: #ef4444;
          --card-bg: #ffffff;
          --shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          --shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.12);
          --radius: 16px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: var(--text-color);
        }

        /* =====================
           CONTAINER
        ===================== */
        .mybooks-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
        }

        /* =====================
           HEADER SECTION
        ===================== */
        .mybooks-header {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          border-radius: var(--radius);
          padding: 2.5rem;
          margin-bottom: 3rem;
          color: white;
          box-shadow: var(--shadow);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .title-section {
          flex: 1;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .title-icon {
          font-size: 2.2rem;
        }

        .page-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          margin: 0;
        }

        .header-stats {
          display: flex;
          gap: 1.5rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 1.2rem 1.8rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 180px;
          transition: var(--transition);
        }

        .stat-card:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateY(-2px);
        }

        .stat-icon {
          font-size: 2rem;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.9rem;
          opacity: 0.9;
          margin-top: 0.25rem;
        }

        .header-actions {
          display: flex;
          justify-content: flex-end;
        }

        /* =====================
           BUTTONS
        ===================== */
        .btn {
          border: none;
          border-radius: 12px;
          padding: 0.9rem 1.8rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          transition: var(--transition);
        }

        .btn-remove-all {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .btn-remove-all:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .btn-icon {
          font-size: 1.2rem;
        }

        /* =====================
           BOOKS GRID
        ===================== */
        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }

        /* =====================
           BOOK CARD
        ===================== */
        .book-card {
          background: var(--card-bg);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          overflow: hidden;
          transition: var(--transition);
          animation: fadeInUp 0.5s ease backwards;
        }

        .book-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-hover);
        }

        .book-card-inner {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .book-image-container {
          position: relative;
          height: 320px;
          overflow: hidden;
        }

        .book-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .book-card:hover .book-image {
          transform: scale(1.05);
        }

        .book-quantity-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          z-index: 2;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .quantity-icon {
          font-size: 0.9rem;
        }

        .quantity-text {
          font-size: 0.9rem;
        }

        .book-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition);
        }

        .book-card:hover .book-overlay {
          opacity: 1;
        }

        .overlay-content {
          text-align: center;
        }

        .btn-return-book {
          background: white;
          color: var(--text-color);
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .btn-return-book:hover {
          background: var(--primary-color);
          color: white;
          transform: translateY(-2px);
        }

        .return-icon {
          font-size: 1rem;
        }

        /* =====================
           BOOK INFO
        ===================== */
        .book-info {
          padding: 1.5rem;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .book-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          line-height: 1.4;
          color: var(--text-color);
        }

        .book-meta {
          margin-bottom: 1.5rem;
          flex-grow: 1;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          font-size: 0.95rem;
        }

        .meta-icon {
          font-size: 1rem;
          color: var(--primary-color);
          min-width: 24px;
        }

        .meta-label {
          color: var(--text-light);
          font-weight: 600;
          min-width: 70px;
        }

        .meta-value {
          color: var(--text-color);
          font-weight: 500;
        }

        .book-actions {
          margin-top: auto;
        }

        .btn-remove-one {
          background: linear-gradient(135deg, var(--danger-color), #dc2626);
          color: white;
          width: 100%;
          padding: 0.9rem 1.5rem;
          border-radius: 10px;
          font-weight: 600;
        }

        .btn-remove-one:hover {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
        }

        .action-icon {
          font-size: 1.1rem;
        }

        /* =====================
           LIBRARY SUMMARY
        ===================== */
        .library-summary {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: var(--shadow);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
        }

        .summary-content {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex: 1;
        }

        .summary-icon {
          font-size: 3rem;
          color: var(--primary-color);
        }

        .summary-text h4 {
          font-size: 1.3rem;
          font-weight: 700;
          margin: 0 0 0.5rem 0;
        }

        .summary-text p {
          color: var(--text-light);
          margin: 0;
          font-size: 1rem;
        }

        .summary-text strong {
          color: var(--primary-color);
        }

        .btn-manage-collection {
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          color: white;
          padding: 0.9rem 2rem;
        }

        .btn-manage-collection:hover {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(99, 102, 241, 0.3);
        }

        .manage-icon {
          font-size: 1.2rem;
        }

        /* =====================
           EMPTY LIBRARY STATE
        ===================== */
        .empty-library {
          background: var(--card-bg);
          border-radius: var(--radius);
          padding: 5rem 3rem;
          text-align: center;
          box-shadow: var(--shadow);
          margin: 3rem 0;
        }

        .empty-content {
          max-width: 500px;
          margin: 0 auto;
        }

        .empty-icon {
          font-size: 4rem;
          margin-bottom: 1.5rem;
          opacity: 0.7;
        }

        .empty-title {
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          color: var(--text-color);
        }

        .empty-description {
          color: var(--text-light);
          font-size: 1.1rem;
          line-height: 1.6;
          margin: 0 0 2rem 0;
        }

        .btn-explore-books {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          color: white;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
        }

        .btn-explore-books:hover {
          background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        }

        .explore-icon {
          font-size: 1.2rem;
        }

        /* =====================
           ANIMATIONS
        ===================== */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .book-card:nth-child(1) { animation-delay: 0.1s; }
        .book-card:nth-child(2) { animation-delay: 0.2s; }
        .book-card:nth-child(3) { animation-delay: 0.3s; }
        .book-card:nth-child(4) { animation-delay: 0.4s; }

        /* =====================
           RESPONSIVE DESIGN
        ===================== */
        @media (max-width: 1200px) {
          .mybooks-container {
            padding: 1.5rem;
          }
          
          .books-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          }
        }

        @media (max-width: 992px) {
          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 2rem;
          }

          .header-stats {
            width: 100%;
            justify-content: space-between;
          }

          .library-summary {
            flex-direction: column;
            gap: 2rem;
            text-align: center;
          }

          .summary-content {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 768px) {
          .mybooks-header {
            padding: 2rem 1.5rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .header-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .stat-card {
            width: 100%;
            justify-content: center;
          }

          .books-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 1.5rem;
          }

          .book-image-container {
            height: 280px;
          }
        }

        @media (max-width: 576px) {
          .mybooks-container {
            padding: 1rem;
          }

          .mybooks-header {
            padding: 1.5rem 1rem;
            margin-bottom: 2rem;
          }

          .page-title {
            font-size: 1.75rem;
          }

          .books-grid {
            grid-template-columns: 1fr;
          }

          .empty-library {
            padding: 3rem 1.5rem;
          }

          .empty-title {
            font-size: 1.5rem;
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

export default MyBooks;
