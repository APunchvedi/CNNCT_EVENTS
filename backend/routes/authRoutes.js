import express from "express";
import { signup, login, updateusername, updateUserProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/updateusername", updateusername);
router.put("/update", protect, updateUserProfile);
router.get("/getProfile", protect, updateUserProfile);
export default router;
