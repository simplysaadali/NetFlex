import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import MovieRow from "../components/MovieRow.jsx";
import useAuth from "../hooks/useAuth.js";
import api from "../api/api.js";
import {
  getMovieDetails,
  getSimilarMovies,
  IMAGE_BASE_URL,
} from "../api/tmdb.js";

function MovieDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [movie, setMovie] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([getMovieDetails(id), getSimilarMovies(id)])
      .then(([movieData, similarData]) => {
        setMovie(movieData);
        setSimilar(similarData);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!user) return;
    api
      .get("/watchlist")
      .then((res) => {
        const found = res.data.some((item) => item.movieId === Number(id));
        setInWatchlist(found);
      })
      .catch(() => {});
  }, [user, id]);

  const toggleWatchlist = async () => {
    if (!user) {
      setMessage("Please sign in to use your watchlist.");
      return;
    }

    try {
      if (inWatchlist) {
        await api.delete(`/watchlist/${id}`);
        setInWatchlist(false);
      } else {
        await api.post("/watchlist", {
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
        });
        setInWatchlist(true);
      }
    } catch (error) {
      setMessage("Something went wrong updating your watchlist.");
    }
  };

  if (loading) return <Loader />;
  if (!movie) return <p style={{ padding: 40 }}>Movie not found.</p>;

  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie-details">
      <div className="movie-details-hero">
        <div className="movie-details-poster">
          <img src={poster} alt={movie.title} />
        </div>
        <div className="movie-details-info">
          <h1>{movie.title}</h1>
          <p className="movie-details-meta">
            {movie.release_date?.slice(0, 4)} • {movie.runtime} min •{" "}
            {movie.genres?.map((g) => g.name).join(", ")} • ⭐{" "}
            {movie.vote_average?.toFixed(1)}
          </p>
          <p className="movie-details-overview">{movie.overview}</p>
          {message && <p className="form-error">{message}</p>}
          <button className="btn btn-primary" onClick={toggleWatchlist}>
            {inWatchlist ? "✓ In My List" : "+ Add to My List"}
          </button>
        </div>
      </div>

      <MovieRow title="More Like This" movies={similar} />
    </div>
  );
}

export default MovieDetails;
