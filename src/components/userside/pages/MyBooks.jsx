/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserHeader from "../UserHeader";
import UserFooter from "../UserFooter";

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
        acc[book.id] = acc[book.id]
          ? { ...acc[book.id], qty: acc[book.id].qty + 1 }
          : { ...book, qty: 1 };
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
      JSON.stringify(users.map(u => u.email === user.email ? updatedUser : u))
    );
  };

  const restoreBookCount = (bookId) => {
    const books = JSON.parse(localStorage.getItem("Books")) || [];
    localStorage.setItem(
      "Books",
      JSON.stringify(
        books.map(b => b.id === bookId ? { ...b, count: b.count + 1 } : b)
      )
    );
  };

  const handleRemoveOne = (bookId) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const myBooks = user.myBooks || [];
    const index = myBooks.findIndex(b => b.id === bookId);
    if (index === -1) return;

    myBooks.splice(index, 1);
    restoreBookCount(bookId);
    updateUserBooks(myBooks);

    setGroupedBooks(
      Object.values(
        myBooks.reduce((acc, book) => {
          acc[book.id] = acc[book.id]
            ? { ...acc[book.id], qty: acc[book.id].qty + 1 }
            : { ...book, qty: 1 };
          return acc;
        }, {})
      )
    );
  };

  const handleRemoveAll = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const myBooks = user.myBooks || [];
    myBooks.forEach(b => restoreBookCount(b.id));
    updateUserBooks([]);
    setGroupedBooks([]);
  };

  return (
    <>
      <UserHeader onLogout={handleUserLogout} />

      <main className="mybooks">
        <div className="page-header">
          <div>
            <h1>My Library</h1>
            <p>{groupedBooks.length} unique books</p>
          </div>

          {groupedBooks.length > 0 && (
            <button className="clear-btn" onClick={handleRemoveAll}>
              Clear All
            </button>
          )}
        </div>

        {groupedBooks.length ? (
          <div className="books-grid">
            {groupedBooks.map(book => (
              <div className="book-card" key={book.id}>
                <img src={book.image} alt={book.name} />

                <div className="book-info">
                  <h3>{book.name}</h3>
                  <p className="author">{book.author}</p>
                  <span className="category">{book.category}</span>

                  <div className="actions">
                    <span className="qty">x{book.qty}</span>
                    <button onClick={() => handleRemoveOne(book.id)}>
                      Return
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <h2>Your library is empty</h2>
            <p>Borrow books to see them here.</p>
            <button onClick={() => navigate("/")}>Browse Books</button>
          </div>
        )}
      </main>

      <UserFooter />

      <style>{`
        .mybooks {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .page-header h1 {
          font-size: 2rem;
          font-weight: 800;
        }

        .page-header p {
          color: #64748b;
          margin-top: 0.25rem;
        }

        .clear-btn {
          background: #ef4444;
          color: white;
          border: none;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1.5rem;
        }

        .book-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
          overflow: hidden;
        }

        .book-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .book-info {
          padding: 1rem;
        }

        .book-info h3 {
          font-size: 1rem;
          font-weight: 700;
        }

        .author {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0.25rem 0;
        }

        .category {
          font-size: 0.75rem;
          background: #eef2ff;
          color: #4338ca;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          display: inline-block;
          margin-bottom: 0.75rem;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .qty {
          font-weight: 700;
        }

        .actions button {
          background: #6366f1;
          color: white;
          border: none;
          padding: 0.4rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .empty {
          text-align: center;
          padding: 4rem 1rem;
        }

        .empty h2 {
          font-size: 1.6rem;
          font-weight: 700;
        }

        .empty p {
          color: #64748b;
          margin: 0.5rem 0 1.5rem;
        }

        .empty button {
          background: #6366f1;
          color: white;
          border: none;
          padding: 0.7rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
        }

        @media (max-width: 640px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default MyBooks;
