

import React, { useState } from "react";

function ViewBooks({ list, handleDelete, handleEdit }) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((list?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="viewbooks-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 mt-5">
              <div className="table-responsive custom-table-card">
                <h2 className="text-center mb-4">View Books</h2>

                <table className="table table-bordered table-striped text-center">
                  <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Book Image</th>
                      <th>Book Name</th>
                      <th>Book Category</th>
                      <th>Book Author</th>
                      <th>Book Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((val, index) => {
                        const { image, name, category, author, count, id } =
                          val;

                        return (
                          <tr key={id}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                              <img
                                src={image}
                                alt={name}
                                className="book-img"
                              />
                            </td>
                            <td>{name}</td>
                            <td>{category}</td>
                            <td>{author}</td>
                            <td>{count}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleDelete(id)}
                                className="btn btn-danger btn-sm me-1 my-1"
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                onClick={() => handleEdit(id)}
                                className="btn btn-warning btn-sm my-1"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center">
                          Data Not Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {}
                {totalPages > 1 && (
                  <nav className="d-flex justify-content-center mt-4">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                          }
                        >
                          Previous
                        </button>
                      </li>

                      {Array.from({ length: totalPages }).map((_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                          }
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{` 
        /* =====================
   Sidebar-aware layout
===================== */



@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =====================
   Table Card
===================== */

.custom-table-card {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 18px;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.08);
  max-width: 1100px;
  margin: 0 auto;
}

/* =====================
   Heading
===================== */

.custom-table-card h2 {
  font-weight: 600;
  letter-spacing: -0.3px;
}

/* =====================
   Table
===================== */

.table {
  font-size: 0.85rem;
  margin-bottom: 0;
}

.table thead th {
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.table td {
  vertical-align: middle;
}

.table-striped tbody tr:nth-of-type(odd) {
  background-color: #f9fafb;
}

/* =====================
   Book Image
===================== */

.book-img {
  height: 50px;
  width: 50px;
  border-radius: 8px;
  object-fit: cover;
  transition: transform 0.2s ease;
}

@media (hover: hover) {
  .book-img:hover {
    transform: scale(1.1);
  }
}

/* =====================
   Row Hover
===================== */

@media (hover: hover) {
  .table tbody tr:hover {
    background-color: #eef2ff;
  }
}

/* =====================
   Buttons (colors untouched)
===================== */

.btn-sm {
  border-radius: 999px;
  padding: 5px 12px;
  font-size: 0.7rem;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

@media (hover: hover) {
  .btn-sm:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
}

/* =====================
   Pagination
===================== */

.pagination .page-link {
  border-radius: 999px;
  font-size: 0.8rem;
  padding: 6px 12px;
}

/* =====================
   Mobile & Tablet
===================== */

@media (max-width: 992px) {
  .viewbooks-wrapper {
    margin-left: 0;
    padding: 16px;
  }
}

@media (max-width: 576px) {
  .table thead {
    display: none;
  }

  .table tbody tr {
    display: block;
    margin-bottom: 14px;
    border-radius: 14px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  }

  .table tbody td {
    display: flex;
    justify-content: space-between;
    padding: 6px 14px;
    font-size: 0.75rem;
  }
}

/* =====================
   Accessibility
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

export default ViewBooks;
