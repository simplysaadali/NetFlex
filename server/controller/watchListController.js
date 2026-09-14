import Watchlist from "../models/watchList.js";

const getWatchlist = async (req, res, next) => {
  try {
    const items = await Watchlist.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    next(error);
  }
};

const addToWatchlist = async (req, res, next) => {
  try {
    const { movieId, title, posterPath } = req.body;

    if (!movieId || !title) {
      return res.status(400).json({ message: "movieId and title are required" });
    }

    const exists = await Watchlist.findOne({ user: req.user._id, movieId });
    if (exists) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    const item = await Watchlist.create({
      user: req.user._id,
      movieId,
      title,
      posterPath,
    });

    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

const removeFromWatchlist = async (req, res, next) => {
  try {
    const { movieId } = req.params;

    const item = await Watchlist.findOneAndDelete({
      user: req.user._id,
      movieId,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found in watchlist" });
    }

    res.json({ message: "Removed from watchlist" });
  } catch (error) {
    next(error);
  }
};

export { getWatchlist, addToWatchlist, removeFromWatchlist };
