import { useNavigate } from "react-router-dom";
import { IMAGE_BASE_URL } from "../api/tmdb.js";
import useAuth from "../hooks/useAuth.js";
import api from "../api/api.js";

function MovieCard({ movie, onWatchlistChange, inWatchlist = false }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/160x240?text=No+Image";

  const handleWatchlistClick = async (e) => {
    e.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      if (inWatchlist) {
        await api.delete(`/watchlist/${movie.id}`);
      } else {
        await api.post("/watchlist", {
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
        });
      }
      if (onWatchlistChange) onWatchlistChange();
    } catch (error) {
      console.error("Watchlist error:", error);
    }
  };

  return (
    <div className="movie-card" onClick={() => navigate(`/movie/${movie.id}`)}>
      <img src={poster} alt={movie.title} />
      <button className="watchlist-btn" onClick={handleWatchlistClick}>
        {inWatchlist ? "✓" : "+"}
      </button>
      <div className="movie-card-overlay">{movie.title}</div>
    </div>
  );
}

export default MovieCard;
