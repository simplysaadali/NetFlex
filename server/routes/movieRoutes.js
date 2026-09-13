const express = require("express");
const router = express.Router();
const {
  trending,
  popular,
  topRated,
  upcoming,
  search,
  details,
  similar,
} = require("../controllers/movieController");

router.get("/trending", trending);
router.get("/popular", popular);
router.get("/top-rated", topRated);
router.get("/upcoming", upcoming);
router.get("/search", search);
router.get("/:id/similar", similar);
router.get("/:id", details);

module.exports = router;
