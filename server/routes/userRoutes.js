import express from "express";
// import User from "./models/User.js";
import { deleteUser, getUser, getUsers, updateUser } from "../controller/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
// router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
