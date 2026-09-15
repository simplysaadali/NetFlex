import { useEffect, useState } from "react";
import Loader from "../components/Loader.jsx";
import api from "../api/api.js";
import { IMAGE_BASE_URL } from "../api/tmdb.js";
import { useNavigate } from "react-router-dom";

function Watchlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadWatchlist = () => {
    setLoading(true);
    api
      .get("/watchlist")
      .then((res) => setItems(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadWatchlist();
  }, []);

  const handleRemove = async (movieId) => {
    await api.delete(`/watchlist/${movieId}`);
    loadWatchlist();
  };

  if (loading) return <Loader />;

  return (
    <div style={{ padding: "20px 40px" }}>
      <h2>My List</h2>
      {items.length === 0 && <p>You haven't added any movies yet.</p>}
      <div className="movie-grid">
        {items.map((item) => {
          const poster = item.posterPath
            ? `${IMAGE_BASE_URL}${item.posterPath}`
            : "https://via.placeholder.com/160x240?text=No+Image";
          return (
            <div key={item._id} className="movie-card" onClick={() => navigate(`/movie/${item.movieId}`)}>
              <img src={poster} alt={item.title} />
              <button
                className="watchlist-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.movieId);
                }}
              >
                ✕
              </button>
              <div className="movie-card-overlay">{item.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Watchlist;
