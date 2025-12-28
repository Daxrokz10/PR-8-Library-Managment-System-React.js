/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [visibleLatestCount, setVisibleLatestCount] = useState(4);

  useEffect(() => {
    axios.get("http://localhost:3000/books").then((res) => setBooks(res.data));
  }, []);

  const latestBooks = books.slice().reverse().slice(0, visibleLatestCount);

  const handleBorrow = async (id) => {
    const user = JSON.parse(sessionStorage.getItem("currentUser"));
    if (!user) {
      alert("Please login first");
      return;
    }

    const bookToBorrow = books.find((b) => b.id === id);
    if (!bookToBorrow || bookToBorrow.count === 0) return;

    // Update book count in API
    await axios.patch(`http://localhost:3000/books/${id}`, {
      count: bookToBorrow.count - 1,
    });

    // Update user's myBooks in API
    const updatedUser = {
      ...user,
      myBooks: [...(user.myBooks || []), bookToBorrow],
    };
    await axios.patch(`http://localhost:3000/users/${user.id}`, {
      myBooks: updatedUser.myBooks,
    });
    sessionStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Refresh books
    const res = await axios.get("http://localhost:3000/books");
    setBooks(res.data);
  };

  const categories = [
    "All Categories",
    ...new Set(books.map((book) => book.category)),
  ];

  const filteredBooks =
    selectedCategory === "All Categories"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <>
      {/* ===== CAROUSEL ===== */}
      <div className="carousel-wrapper">
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {[
              "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
              "https://images.unsplash.com/photo-1512820790803-83ca734da794",
              "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
            ].map((img, i) => (
              <div
                className={`carousel-item ${i === 0 ? "active" : ""}`}
                key={i}
              >
                <img src={img} className="d-block w-100 carousel-img" alt="" />
                <div className="carousel-caption">
                  <h1>Digital Library</h1>
                  <p>Borrow books anytime, anywhere</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== LATEST BOOKS ===== */}
      <div className="container my-5">
        <h2 className="section-title">Latest Arrivals</h2>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {latestBooks.map((book) => (
            <div className="col" key={book.id}>
              <div className="book-card">
                <img src={book.image} alt={book.name} />
                <div className="book-info">
                  <h5>{book.name}</h5>
                  <p className="author">{book.author}</p>
                  <span className="category">{book.category}</span>

                  <button
                    disabled={book.count === 0}
                    onClick={() => handleBorrow(book.id)}
                  >
                    {book.count === 0 ? "Out of Stock" : "Borrow"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleLatestCount < books.length && (
          <div className="text-center mt-4">
            <button
              className="btn-load"
              onClick={() => setVisibleLatestCount((p) => p + 4)}
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* ===== CATEGORY FILTER ===== */}
      <div className="container my-5">
        <div className="filter-bar">
          <h2 className="section-title">Browse Books</h2>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4 mt-3">
          {filteredBooks.map((book) => (
            <div className="col" key={book.id}>
              <div className="book-card">
                <img src={book.image} alt={book.name} />
                <div className="book-info">
                  <h5>{book.name}</h5>
                  <p className="author">{book.author}</p>
                  <span className="category">{book.category}</span>

                  <button
                    disabled={book.count === 0}
                    onClick={() => handleBorrow(book.id)}
                  >
                    {book.count === 0 ? "Out of Stock" : "Borrow"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== STYLES ===== */}
      <style>{`
        body {
          background: #f8fafc;
          font-family: Inter, sans-serif;
        }

        .carousel-wrapper {
          margin-bottom: 3rem;
        }

        .carousel-img {
          height: 450px;
          object-fit: cover;
          filter: brightness(0.6);
        }

        .carousel-caption {
          bottom: 30%;
        }

        .carousel-caption h1 {
          font-size: 3rem;
          font-weight: 800;
        }

        .carousel-caption p {
          font-size: 1.1rem;
        }

        .section-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
        }

        .book-card {
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0,0,0,0.06);
          transition: 0.3s;
        }

        .book-card:hover {
          transform: translateY(-6px);
        }

        .book-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .book-info {
          padding: 1rem;
        }

        .book-info h5 {
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }

        .author {
          font-size: 0.85rem;
          color: #64748b;
        }

        .category {
          display: inline-block;
          background: #eef2ff;
          color: #4338ca;
          font-size: 0.75rem;
          padding: 0.25rem 0.6rem;
          border-radius: 6px;
          margin: 0.5rem 0;
        }

        .book-info button {
          width: 100%;
          border: none;
          background: #6366f1;
          color: white;
          padding: 0.6rem;
          border-radius: 8px;
          font-weight: 600;
        }

        .book-info button:disabled {
          background: #94a3b8;
        }

        .btn-load {
          border: 2px solid #6366f1;
          background: transparent;
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          color: #6366f1;
        }

        .filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .filter-bar select {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #cbd5f5;
        }

        @media (max-width: 768px) {
          .carousel-img {
            height: 350px;
          }

          .carousel-caption h1 {
            font-size: 2rem;
          }

          .filter-bar {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}

export default Home;
