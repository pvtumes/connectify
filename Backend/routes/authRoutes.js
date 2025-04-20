import express from "express";
import { getUserProfile, login, signup } from "../controllers/authControllers.js";
import { protect } from "../middleware/user.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile",  getUserProfile);

export default router;
