const tmdbService = require("../services/tmdbService");

const trending = async (req, res, next) => {
  try {
    const movies = await tmdbService.getTrending();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const popular = async (req, res, next) => {
  try {
    const movies = await tmdbService.getPopular();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const topRated = async (req, res, next) => {
  try {
    const movies = await tmdbService.getTopRated();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const upcoming = async (req, res, next) => {
  try {
    const movies = await tmdbService.getUpcoming();
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const search = async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "query param is required" });
    }
    const movies = await tmdbService.searchMovies(query);
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

const details = async (req, res, next) => {
  try {
    const movie = await tmdbService.getMovieDetails(req.params.id);
    res.json(movie);
  } catch (error) {
    next(error);
  }
};

const similar = async (req, res, next) => {
  try {
    const movies = await tmdbService.getSimilarMovies(req.params.id);
    res.json(movies);
  } catch (error) {
    next(error);
  }
};

module.exports = { trending, popular, topRated, upcoming, search, details, similar };
