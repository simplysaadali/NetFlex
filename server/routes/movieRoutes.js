import express from "express";
import { details, popular, search, similar, topRated, trending, upcoming } from "../controller/movieController.js";
const router = express.Router();

router.get("/trending", trending);
router.get("/popular", popular);
router.get("/top-rated", topRated);
router.get("/upcoming", upcoming);
router.get("/search", search);
router.get("/:id/similar", similar);
router.get("/:id", details);

export default router;
