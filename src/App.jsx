/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/static-components */
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

// Admin
import Header from "./components/admin/Header";
import Dashboard from "./components/admin/pages/Dashboard";
import AddBook from "./components/admin/pages/AddBook";
import ViewBooks from "./components/admin/pages/ViewBooks";
import AdminLogin from "./components/admin/pages/AdminLogin";

// User
import Home from "./components/userside/pages/Home";
import Login from "./components/userside/Login";
import Signup from "./components/userside/Signup";
import UserHeader from "./components/userside/UserHeader";
import UserFooter from "./components/userside/UserFooter";
import AboutUs from "./components/userside/pages/AboutUs";
import MyBooks from "./components/userside/pages/MyBooks";
import MyProfile from "./components/userside/pages/MyProfile";

function App() {
  const [book, setBook] = useState({});
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  const isAuth = localStorage.getItem("isAuth") === "true";
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("Books")) || [];
    setList(storedBooks);

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const fixedUsers = storedUsers.map((u) => ({
      ...u,
      id: u.id ?? Date.now() + Math.random(),
    }));
    localStorage.setItem("users", JSON.stringify(fixedUsers));
    setUsers(fixedUsers);
  }, []);

  const handleUserLogout = () => {
    localStorage.removeItem("isAuth");
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  const handleAdminLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login", { replace: true });
  };

  const handleAddBookSubmit = (e) => {
    e.preventDefault();

    const updatedBooks = book.id
      ? list.map((b) => (b.id === book.id ? book : b))
      : [...list, { ...book, id: Date.now() }];

    setList(updatedBooks);
    localStorage.setItem("Books", JSON.stringify(updatedBooks));
    setBook({});
    setErrors({});
    navigate("/view-books");
  };

  const handleDeleteBook = (id) => {
    const updatedBooks = list.filter((b) => b.id !== id);
    setList(updatedBooks);
    localStorage.setItem("Books", JSON.stringify(updatedBooks));
  };

  const handleEditBook = (id) => {
    const selectedBook = list.find((b) => b.id === id);
    setBook(selectedBook);
    navigate("/add-book");
  };

  const ProtectedUserRoute = ({ children }) =>
    isAuth ? children : <Navigate to="/login" />;

  return (
    <>
      {isAdminLoggedIn && <Header onLogout={handleAdminLogout} />}
      {isHomePage && <UserHeader onLogout={handleUserLogout} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/aboutus"
          element={<AboutUs handleUserLogout={handleUserLogout} />}
        />

        <Route
          path="/my-books"
          element={
            <ProtectedUserRoute>
              <MyBooks handleUserLogout={handleUserLogout} />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/myprofile"
          element={
            <ProtectedUserRoute>
              <MyProfile />
            </ProtectedUserRoute>
          }
        />

        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={isAuth ? <Navigate to="/" /> : <Signup />}
        />

        <Route
          path="/admin-login"
          element={isAdminLoggedIn ? <Navigate to="/admin" /> : <AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <Dashboard books={list} users={users} setUsers={setUsers} />
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />

        <Route
          path="/add-book"
          element={
            isAdminLoggedIn ? (
              <AddBook
                book={book}
                errors={errors}
                handleChange={(e) =>
                  setBook({ ...book, [e.target.name]: e.target.value })
                }
                handleSubmit={handleAddBookSubmit}
              />
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />

        <Route
          path="/view-books"
          element={
            isAdminLoggedIn ? (
              <ViewBooks
                list={list}
                handleDelete={handleDeleteBook}
                handleEdit={handleEditBook}
              />
            ) : (
              <Navigate to="/admin-login" />
            )
          }
        />
      </Routes>

      {isHomePage && <UserFooter />}
    </>
  );
}

export default App;
