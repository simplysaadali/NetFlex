import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Search from "../pages/Search.jsx";
import MovieDetails from "../pages/MovieDetails.jsx";
import Watchlist from "../pages/Watchlist.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Profile from "../pages/Profile.jsx";
import NotFound from "../pages/NotFound.jsx";
import useAuth from "../hooks/useAuth.js";
import Loader from "../components/Loader.jsx";

// Simple wrapper that redirects to /login if there's no logged-in user
function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <Loader />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/watchlist"
        element={
          <PrivateRoute>
            <Watchlist />
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
