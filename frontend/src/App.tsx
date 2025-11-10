import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
<<<<<<< HEAD
import axios from "axios";
=======
>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/registerPage";
import DashboardPage from "./pages/dashboardPage";
import ProtectedRoute from "./components/ProtectedRoutes";

<<<<<<< HEAD
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/users/profile", {
          withCredentials: true,
        });
        setLoggedIn(true);
      } catch {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-200 via-white to-blue-100">
        <p className="text-xl font-semibold text-blue-600">Cargando...</p>
      </div>
    );
  }

=======

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const storedLogin = localStorage.getItem("loggedIn") === "true";
    setLoggedIn(storedLogin);
  }, []);

>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
<<<<<<< HEAD
        path="/login"
        element={
          loggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <LoginPage setLoggedIn={setLoggedIn} />
          )
        }
      />
      <Route
        path="/register"
        element={
          loggedIn ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <RegisterPage />
          )
        }
      />
=======
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage setLoggedIn={setLoggedIn} />
            )
          }
        />
      <Route path="/register" element={<RegisterPage />} />

>>>>>>> c23096c38fde6f2ae5af57717070bfe3ac6570be
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute loggedIn={loggedIn}>
            <DashboardPage setLoggedIn={setLoggedIn} />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;