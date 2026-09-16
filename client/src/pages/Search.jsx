import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard.jsx";
import Loader from "../components/Loader.jsx";
import { searchMovies } from "../api/tmdb.js";

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    searchMovies(query)
      .then(setResults)
      .catch(() => setError("Something went wrong while searching."))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return <Loader />;

  return (
    <div style={{ padding: "20px 40px" }}>
      <h2>Search results for "{query}"</h2>
      {error && <p>{error}</p>}
      {!error && results.length === 0 && <p>No movies found.</p>}
      <div className="movie-grid">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Search;
