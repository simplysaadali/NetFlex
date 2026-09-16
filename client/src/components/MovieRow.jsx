import MovieCard from "./MovieCard.jsx";

function MovieRow({ title, movies }) {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-row">
      <h2>{title}</h2>
      <div className="movie-row-track">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
