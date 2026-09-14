import express from "express";
import { addToWatchlist, getWatchlist, removeFromWatchlist } from "../controller/watchListController.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", protect, getWatchlist);
router.post("/", protect, addToWatchlist);
router.delete("/:movieId", protect, removeFromWatchlist);

export default router;
