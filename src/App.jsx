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
import axios from "axios";

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

  const [isAuth, setIsAuth] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    // Fetch books
    axios.get("http://localhost:3000/books").then((res) => setList(res.data));
    // Fetch users
    axios.get("http://localhost:3000/users").then((res) => setUsers(res.data));
    // Auth state from session (optional: use cookies or context in real app)
    setIsAuth(sessionStorage.getItem("isAuth") === "true");
    setIsAdminLoggedIn(sessionStorage.getItem("isAdminLoggedIn") === "true");
  }, []);

  const handleUserLogout = () => {
    sessionStorage.removeItem("isAuth");
    sessionStorage.removeItem("currentUser");
    setIsAuth(false);
    navigate("/login", { replace: true });
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem("isAdminLoggedIn");
    setIsAdminLoggedIn(false);
    navigate("/admin-login", { replace: true });
  };

  const handleAddBookSubmit = async (e) => {
    e.preventDefault();
    try {
      if (book.id) {
        // Edit book
        await axios.put(`http://localhost:3000/books/${book.id}`, book);
      } else {
        // Add new book
        await axios.post("http://localhost:3000/books", book);
      }
      // Refresh list
      const res = await axios.get("http://localhost:3000/books");
      setList(res.data);
      setBook({});
      setErrors({});
      navigate("/view-books");
    } catch (err) {
      setErrors({ submit: "Failed to save book." });
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/books/${id}`);
      const res = await axios.get("http://localhost:3000/books");
      setList(res.data);
    } catch (err) {
      // Optionally handle error
    }
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
