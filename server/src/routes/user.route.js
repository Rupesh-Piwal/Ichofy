import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";
import { protectRoute } from "../middleware/auth.middleware";

const router = Router();
router.get("/", protectRoute, getAllUsers);
export default router;
