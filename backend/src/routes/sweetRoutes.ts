import { Router } from "express";
import { addSweet, getSweets, searchSweets } from "../controllers/sweetController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, addSweet);
router.get("/search", authenticateToken, searchSweets);
router.get("/", authenticateToken, getSweets);

export default router;
