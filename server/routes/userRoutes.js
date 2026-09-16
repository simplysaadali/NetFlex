import express from "express";
import { deleteUser, getProfile, getUser, getUsers, updateProfile, updateUser } from "../controller/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Specific routes MUST come before /:id wildcard
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
