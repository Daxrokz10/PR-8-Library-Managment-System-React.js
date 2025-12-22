import React, { useEffect, useMemo, useState } from "react";

function Dashboard({ books = [], users = [], setUsers }) {
  useEffect(() => {
    const syncUsers = () => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(storedUsers);
    };

    const syncBooks = () => {
      const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

      window.dispatchEvent(
        new CustomEvent("booksUpdated", { detail: storedBooks })
      );
    };

    syncUsers();
    syncBooks();

    window.addEventListener("profileUpdated", syncUsers);
    window.addEventListener("booksUpdated", syncBooks);

    window.addEventListener("storage", (e) => {
      if (e.key === "users") syncUsers();
      if (e.key === "books") syncBooks();
    });

    return () => {
      window.removeEventListener("profileUpdated", syncUsers);
      window.removeEventListener("booksUpdated", syncBooks);
      window.removeEventListener("storage", syncUsers);
    };
  }, [setUsers]);

  const stats = useMemo(() => {
    const totalBooks = books.length;
    const categories = new Set(books.map((b) => b.category)).size;
    const borrowed = books.filter((b) => Number(b.count) === 0).length;
    const available = books.filter((b) => Number(b.count) > 0).length;
    const totalStock = books.reduce((sum, b) => sum + Number(b.count || 0), 0);
    const totalUsers = users.length;

    return [
      {
        label: "Total Books",
        value: totalBooks,
        bg: "primary",
        icon: "📚",
      },
      {
        label: "Categories",
        value: categories,
        bg: "success",
        icon: "🏷️",
      },
      {
        label: "Borrowed",
        value: borrowed,
        bg: "danger",
        icon: "📖",
      },
      {
        label: "Available",
        value: available,
        bg: "warning",
        icon: "✅",
      },
      {
        label: "Total Stock",
        value: totalStock,
        bg: "info",
        icon: "📦",
      },
      {
        label: "Users",
        value: totalUsers,
        bg: "dark",
        icon: "👥",
      },
    ];
  }, [books, users]);

  const recentBooks = books.slice(-10).reverse();
  const booksPerPage = 5;
  const [currentBookPage, setCurrentBookPage] = useState(1);

  const totalBookPages = Math.ceil(recentBooks.length / booksPerPage);
  const startBookIndex = (currentBookPage - 1) * booksPerPage;
  const paginatedRecentBooks = recentBooks.slice(
    startBookIndex,
    startBookIndex + booksPerPage
  );

  const recentUsers = users.slice(-10).reverse();

  const handleDeleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const updatedUsers = users.filter((u) => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.id === id) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAuth");
    }
  };

  return (
    <>
      <div className="dashboard">
        <h2 className="mb-4">Dashboard</h2>

        {/* Stats */}
        <div className="stats">
          {stats.map((s) => (
            <div key={s.label} className="stat-box">
              <p className="stat-label">{s.label}</p>
              <h3 className="stat-value">{s.value}</h3>
            </div>
          ))}
        </div>

        {/* Recent Books */}
        <div className="card">
          <div className="card-header">
            <h4>Recent Books</h4>
            <span>{books.length} total</span>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecentBooks.length ? (
                paginatedRecentBooks.map((b, i) => (
                  <tr key={b.id}>
                    <td>{startBookIndex + i + 1}</td>
                    <td>{b.name}</td>
                    <td>{b.author}</td>
                    <td>{b.category}</td>
                    <td>{b.count}</td>
                    <td>
                      {b.count === 0 ? (
                        <span className="badge danger">Borrowed</span>
                      ) : (
                        <span className="badge success">Available</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalBookPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentBookPage === 1}
                onClick={() => setCurrentBookPage((p) => p - 1)}
              >
                Prev
              </button>

              <span>
                Page {currentBookPage} of {totalBookPages}
              </span>

              <button
                disabled={currentBookPage === totalBookPages}
                onClick={() => setCurrentBookPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Recent Users */}
        <div className="card">
          <div className="card-header">
            <h4>Recent Users</h4>
            <span>{users.length} total</span>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.length ? (
                recentUsers.map((u, i) => (
                  <tr key={u.id}>
                    <td>{i + 1}</td>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role || "User"}</td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
      body {
  padding-top: 60px;
}
        .dashboard {
  padding: 2rem;
  background: #f5f6f8;
  min-height: 100vh;
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.stat-box {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.stat-label {
  font-size: 0.85rem;
  color: #666;
}

.stat-value {
  margin-top: 0.5rem;
}

/* Cards */
.card {
  background: white;
  border-radius: 6px;
  border: 1px solid #ddd;
  margin-bottom: 2rem;
}

.card-header {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
}

/* Table */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}

.table th {
  background: #fafafa;
  text-align: left;
}

/* Badges */
.badge {
  padding: 0.25rem 0.6rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

.badge.success {
  background: #e6f4ea;
  color: #137333;
}

.badge.danger {
  background: #fce8e6;
  color: #a50e0e;
}

/* Buttons */
.btn-danger {
  background: #dc3545;
  border: none;
  color: white;
  padding: 0.4rem 0.7rem;
  border-radius: 4px;
  cursor: pointer;
}

/* Pagination */
.pagination {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}
  
      `}</style>
    </>
  );
}

export default Dashboard;
