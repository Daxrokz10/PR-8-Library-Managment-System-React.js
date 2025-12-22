/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";

function Home() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [visibleLatestCount, setVisibleLatestCount] = useState(4);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("Books")) || [];
    setBooks(storedBooks);
  }, []);

  const latestBooks = books.slice().reverse().slice(0, visibleLatestCount);

  const handleBorrow = (id) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Please login first");
      return;
    }

    const bookToBorrow = books.find((b) => b.id === id);
    if (!bookToBorrow || bookToBorrow.count === 0) return;

    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, count: book.count - 1 } : book
    );

    const updatedUser = {
      ...user,
      myBooks: [...(user.myBooks || []), bookToBorrow],
    };

    setBooks(updatedBooks);
    localStorage.setItem("Books", JSON.stringify(updatedBooks));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
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
      {/* Enhanced Carousel */}
      <div className="carousel-wrapper">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={0}
              className="active"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={1}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={2}
            />
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="carousel-image-container">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                  className="d-block w-100 carousel-image"
                  alt="Books"
                />
                <div className="carousel-overlay">
                  <h1 className="carousel-title">
                    Welcome to Our Digital Library
                  </h1>
                  <p className="carousel-subtitle">
                    Discover thousands of books at your fingertips
                  </p>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="carousel-image-container">
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                  className="d-block w-100 carousel-image"
                  alt="Books"
                />
                <div className="carousel-overlay">
                  <h1 className="carousel-title">Read Anywhere, Anytime</h1>
                  <p className="carousel-subtitle">
                    Access your favorite books on any device
                  </p>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="carousel-image-container">
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
                  className="d-block w-100 carousel-image"
                  alt="Books"
                />
                <div className="carousel-overlay">
                  <h1 className="carousel-title">Expand Your Knowledge</h1>
                  <p className="carousel-subtitle">
                    Explore diverse genres and authors
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev carousel-control-btn"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>

          <button
            className="carousel-control-next carousel-control-btn"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>

      {/* Latest Books Section */}
      <div className="container my-5">
        <div className="section-header">
          <h3 className="section-title">Latest Books</h3>
          <div className="section-badge">
            <span className="badge-count">{latestBooks.length}</span> new
            arrivals
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {latestBooks.length ? (
            latestBooks.map((book) => (
              <div className="col-md-3" key={book.id}>
                <div className="book-card h-100 position-relative">
                  <span className="book-badge">
                    <span className="badge-new">NEW</span>
                  </span>

                  <div className="book-image-wrapper">
                    <img
                      src={book.image}
                      className="card-img-top book-image"
                      alt={book.name}
                    />
                    <div className="book-overlay">
                      <div className="book-actions">
                        <button
                          className="btn-quick-view"
                          onClick={() => handleBorrow(book.id)}
                          disabled={book.count === 0}
                        >
                          {book.count === 0 ? "Out of Stock" : "Quick Borrow"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <h5 className="book-title">{book.name}</h5>
                    <div className="book-meta">
                      <p className="book-author">
                        <span className="meta-icon">✍️</span> {book.author}
                      </p>
                      <p className="book-category">
                        <span className="meta-icon">🏷️</span> {book.category}
                      </p>
                    </div>
                    <div className="book-stock">
                      <span
                        className={`stock-status ${
                          book.count === 0 ? "out-of-stock" : "in-stock"
                        }`}
                      >
                        <span className="status-icon">
                          {book.count === 0 ? "⛔" : "✅"}
                        </span>
                        {book.count === 0
                          ? "Out of Stock"
                          : `${book.count} Available`}
                      </span>
                    </div>
                  </div>

                  <div className="card-footer bg-transparent border-0 text-center">
                    <button
                      className="btn btn-borrow"
                      disabled={book.count === 0}
                      onClick={() => handleBorrow(book.id)}
                    >
                      <span className="btn-icon">📖</span>
                      {book.count === 0 ? "Out of Stock" : "Borrow Book"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon"></div>
              <p className="empty-text">No books available</p>
            </div>
          )}
        </div>

        {visibleLatestCount < books.length && (
          <div className="text-center mt-5">
            <button
              className="btn btn-load-more"
              onClick={() => setVisibleLatestCount((prev) => prev + 4)}
            >
              Load More Books
            </button>
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="container my-5">
        <div className="section-header">
          <div className="section-title-wrapper">
            <h3 className="section-title">Browse Categories</h3>
            <p className="section-subtitle">Browse Categories with All Books</p>
          </div>
          <div className="category-filter-wrapper">
            <div className="filter-label">Filter:</div>
            <select
              className="form-select category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="category-count gap-3">
              {filteredBooks.length}
              Books Found
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredBooks.length ? (
            filteredBooks.map((book) => (
              <div className="col-md-3" key={book.id}>
                <div className="book-card h-100">
                  <div className="book-image-wrapper">
                    <img
                      src={book.image}
                      className="card-img-top book-image"
                      alt={book.name}
                    />
                    <div className="category-badge">{book.category}</div>
                  </div>
                  <div className="card-body">
                    <h5 className="book-title">{book.name}</h5>
                    <div className="book-meta">
                      <p className="book-author">
                        <span className="meta-icon">✍️</span> {book.author}
                      </p>
                      <p className="book-category">
                        <span className="meta-icon">🏷️</span> {book.category}
                      </p>
                    </div>
                    <div className="book-stock">
                      <span
                        className={`stock-status ${
                          book.count === 0 ? "out-of-stock" : "in-stock"
                        }`}
                      >
                        <span className="status-icon">
                          {book.count === 0 ? "⛔" : "✅"}
                        </span>
                        {book.count === 0
                          ? "Out of Stock"
                          : `${book.count} Available`}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button
                      className="btn btn-borrow"
                      disabled={book.count === 0}
                      onClick={() => handleBorrow(book.id)}
                    >
                      <span className="btn-icon">📖</span>
                      {book.count === 0 ? "Out of Stock" : "Borrow Book"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p className="empty-text">No books found for this category</p>
            </div>
          )}
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
          --warning-color: #f59e0b;
          --danger-color: #ef4444;
          --card-bg: #ffffff;
          --card-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          --card-shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.12);
          --border-radius: 16px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        body {
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: var(--text-color);
        }

        /* =====================
           CAROUSEL
        ===================== */
        .carousel-wrapper {
          position: relative;
          margin-bottom: 3rem;
          border-radius: 0 0 20px 20px;
          overflow: hidden;
        }

        .carousel-image-container {
          position: relative;
        }

        .carousel-image {
          height: 500px;
          object-fit: cover;
          filter: brightness(0.7);
        }

        .carousel-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          color: white;
          padding: 2rem;
          background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
        }

        .carousel-title {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 1rem;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }

        .carousel-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
          max-width: 600px;
        }

        .carousel-control-btn {
          width: 60px;
          height: 60px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: 50%;
          margin: 0 2rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          transition: var(--transition);
        }

        .carousel-control-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* =====================
           SECTION HEADERS
        ===================== */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2.5rem;
          padding: 1.5rem;
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--card-shadow);
        }

        .section-title-wrapper {
          flex: 1;
        }

        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-icon {
          font-size: 1.5rem;
        }

        .section-subtitle {
          color: var(--text-light);
          margin: 0.5rem 0 0;
          font-size: 0.95rem;
        }

        .section-badge {
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .badge-count {
          background: white;
          color: var(--primary-color);
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        /* =====================
   BOOK CARDS - FIXED
===================== */
.book-card {
  border: none;
  border-radius: var(--border-radius);
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  overflow: hidden;
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
}

.book-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--card-shadow-hover);
}

.book-image-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 250px; /* Fixed height for all images */
  background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
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

.book-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition);
  z-index: 1;
}

.book-card:hover .book-overlay {
  opacity: 1;
}

.btn-quick-view {
  background: white;
  color: var(--text-color);
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  z-index: 2;
  font-size: 0.9rem;
}

.btn-quick-view:hover:not(:disabled) {
  background: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.btn-quick-view:disabled {
  background: #cbd5e1;
  color: #64748b;
  cursor: not-allowed;
  opacity: 0.7;
}

.book-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.badge-new {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.badge-trending {
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;
}

.category-badge {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
  white-space: nowrap;
}

/* =====================
   CARD BODY & CONTENT
===================== */
.card-body {
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.book-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.4;
  color: var(--text-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 3rem; /* Fixed height for 2 lines */
}

.book-meta {
  margin-bottom: 1rem;
}

.book-author, .book-category {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta-icon {
  font-size: 0.9rem;
  flex-shrink: 0;
}

.book-stock {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
}

.stock-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  border-radius: 20px;
  background: #f8fafc;
  width: fit-content;
}

.in-stock {
  color: var(--success-color);
  background: rgba(16, 185, 129, 0.1);
}

.out-of-stock {
  color: var(--danger-color);
  background: rgba(239, 68, 68, 0.1);
}

.status-icon {
  font-size: 1rem;
}

/* =====================
   CARD FOOTER
===================== */
.card-footer {
  padding: 1rem 1.5rem 1.5rem;
  background: transparent !important;
  border-top: 1px solid #e2e8f0 !important;
  margin-top: auto;
}

/* =====================
   BUTTONS
===================== */
.btn-borrow {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  border: none;
  border-radius: 50px;
  padding: 0.85rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
}

.btn-borrow:hover:not(:disabled) {
  background: linear-gradient(135deg, var(--primary-dark), var(--primary-color));
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.3);
}

.btn-borrow:disabled {
  background: linear-gradient(135deg, #94a3b8, #64748b);
  color: #cbd5e1;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  opacity: 0.7;
}

.btn-icon {
  font-size: 1rem;
}

.btn-load-more {
  background: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 50px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-load-more:hover {
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(99, 102, 241, 0.2);
  border-color: transparent;
}

.load-more-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.btn-load-more:hover .load-more-icon {
  transform: translateY(2px);
}

/* =====================
           FILTER SECTION
        ===================== */
        .category-filter-wrapper {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--text-light);
          font-size: 0.9rem;
          font-weight: 600;
        }

        .filter-icon {
          font-size: 1rem;
        }

        .category-select {
          border: 2px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          font-size: 0.95rem;
          min-width: 200px;
          background: white;
          cursor: pointer;
          transition: var(--transition);
        }

        .category-select:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .category-count {
          color: var(--text-light);
          font-size: 0.9rem;
          padding: 0.5rem 1rem;
          background: var(--secondary-color);
          border-radius: 8px;
          font-weight: 600;
        }

        /* =====================
           EMPTY STATES
        ===================== */
        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: var(--border-radius);
          box-shadow: var(--card-shadow);
          margin: 2rem 0;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }

        .empty-text {
          color: var(--text-light);
          font-size: 1.1rem;
          margin: 0;
        }

        /* =====================
   RESPONSIVE ADJUSTMENTS
===================== */
@media (max-width: 1200px) {
  .carousel-title {
    font-size: 2.5rem;
  }
  
  .book-image-wrapper {
    height: 220px;
  }
}

@media (max-width: 992px) {
  .book-image-wrapper {
    height: 200px;
  }
  
  .book-title {
    font-size: 1rem;
    min-height: 2.8rem;
  }
  
  .card-body {
    padding: 1.25rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .category-filter-wrapper {
    flex-direction: column;
    width: 100%;
  }

  .category-select {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .book-image-wrapper {
    height: 180px;
  }
  
  .book-card {
    max-width: 320px;
    margin: 0 auto;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  .card-footer {
    padding: 0.75rem 1rem 1rem;
  }
  
  /* Always show overlay on mobile */
  .book-overlay {
    opacity: 1;
    background: rgba(0, 0, 0, 0.5);
  }
  
  .btn-quick-view {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
  
  .carousel-title {
    font-size: 2rem;
  }

  .carousel-subtitle {
    font-size: 1rem;
  }

  .carousel-image {
    height: 400px;
  }
  
  .btn-borrow {
    padding: 0.75rem 1.25rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 576px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .carousel-title {
    font-size: 1.75rem;
  }

  .carousel-control-btn {
    margin: 0 1rem;
    width: 50px;
    height: 50px;
  }

  .row.g-4 {
    gap: 1.5rem !important;
  }

  .col-md-3 {
    width: 100%;
  }
  
  .book-image-wrapper {
    height: 160px;
  }
  
  .book-title {
    font-size: 0.95rem;
    min-height: 2.6rem;
  }
  
  .book-author, .book-category {
    font-size: 0.85rem;
  }
  
  .badge-new,
  .badge-trending,
  .category-badge {
    padding: 0.3rem 0.6rem;
    font-size: 0.7rem;
  }
  
  .btn-borrow {
    padding: 0.7rem 1rem;
    font-size: 0.8rem;
  }
  
  .btn-borrow .btn-text {
    display: none;
  }
  
  .btn-borrow .btn-icon {
    margin: 0;
    font-size: 1.1rem;
  }
}

/* =====================
   GRID LAYOUT FIX
===================== */
.row-cols-md-4 .col-md-3 {
  display: flex;
}

.row-cols-md-4 .book-card {
  width: 100%;
}

/* =====================
   FALLBACK FOR MISSING IMAGES
===================== */
.book-image-wrapper::before {
  content: "📚";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  opacity: 0.3;
  z-index: 0;
}

/* =====================
   ANIMATIONS
===================== */
@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.book-card {
  animation: cardAppear 0.4s ease backwards;
}

.book-card:nth-child(1) { animation-delay: 0.1s; }
.book-card:nth-child(2) { animation-delay: 0.2s; }
.book-card:nth-child(3) { animation-delay: 0.3s; }
.book-card:nth-child(4) { animation-delay: 0.4s; }

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

export default Home;
