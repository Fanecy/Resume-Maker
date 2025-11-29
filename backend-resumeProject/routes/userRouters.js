import express from "express";
import { protect } from "../middleware/authMiddleWare.js";

import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";

const userRouters = express.Router();

userRouters.post("/register", registerUser);
userRouters.post("/login", loginUser);

userRouters.get("/profile", protect, getUserProfile);

export default userRouters;
