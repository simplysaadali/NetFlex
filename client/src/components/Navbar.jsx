import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

function Navbar() {
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          NETFLEX
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li>
              <Link to="/watchlist">My List</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-right">
        <form onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </form>

        {user ? (
          <>
            <Link to="/profile">{user.name}</Link>
            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary">Sign In</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
