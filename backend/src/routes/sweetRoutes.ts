import { Router } from "express";
import { addSweet } from "../controllers/sweetController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, addSweet);

export default router;
