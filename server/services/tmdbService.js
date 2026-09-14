import axios from "axios";

const tmdb = axios.create({
  baseURL: process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.TMDB_API_KEY,
  },
});

const getTrending = async () => {
  const { data } = await tmdb.get("/trending/movie/week");
  return data.results;
};

const getPopular = async () => {
  const { data } = await tmdb.get("/movie/popular");
  return data.results;
};

const getTopRated = async () => {
  const { data } = await tmdb.get("/movie/top_rated");
  return data.results;
};

const getUpcoming = async () => {
  const { data } = await tmdb.get("/movie/upcoming");
  return data.results;
};

const searchMovies = async (query) => {
  const { data } = await tmdb.get("/search/movie", {
    params: { query },
  });
  return data.results;
};

const getMovieDetails = async (id) => {
  const { data } = await tmdb.get(`/movie/${id}`, {
    params: { append_to_response: "videos,credits" },
  });
  return data;
};

const getSimilarMovies = async (id) => {
  const { data } = await tmdb.get(`/movie/${id}/similar`);
  return data.results;
};

export default {
  getTrending,
  getPopular,
  getTopRated,
  getUpcoming,
  searchMovies,
  getMovieDetails,
  getSimilarMovies,
};
