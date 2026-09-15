import api from "./api.js";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

export const getTrending = () => api.get("/movies/trending").then((res) => res.data);

export const getPopular = () => api.get("/movies/popular").then((res) => res.data);

export const getTopRated = () => api.get("/movies/top-rated").then((res) => res.data);

export const getUpcoming = () => api.get("/movies/upcoming").then((res) => res.data);

export const searchMovies = (query) =>
  api.get("/movies/search", { params: { query } }).then((res) => res.data);

export const getMovieDetails = (id) => api.get(`/movies/${id}`).then((res) => res.data);

export const getSimilarMovies = (id) =>
  api.get(`/movies/${id}/similar`).then((res) => res.data);
