import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();
router.get("/", protectRoute, getAllUsers);
export default router;
