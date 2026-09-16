import { useNavigate } from "react-router-dom";
import { BACKDROP_BASE_URL } from "../api/tmdb.js";

function Hero({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  const backdrop = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : "";

  return (
    <div className="hero" style={{ backgroundImage: `url(${backdrop})` }}>
      <div className="hero-content">
        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-overview">{movie.overview}</p>
        <div className="hero-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            ▶ More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
