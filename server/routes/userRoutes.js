import express from "express";
import { deleteUser, getProfile, getUser, getUsers, updateProfile, updateUser } from "../controller/userController.js";
import protect from '../middleware/authMiddleware';

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
