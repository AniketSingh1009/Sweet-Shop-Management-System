import { Router } from "express";
import { addSweet, getSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet } from "../controllers/sweetController";
import { authenticateToken } from "../middleware/authMiddleware";
import { requireAdmin } from "../middleware/adminMiddleware";

const router = Router();

router.post("/", authenticateToken, addSweet);
router.get("/search", authenticateToken, searchSweets);
router.get("/", authenticateToken, getSweets);
router.put("/:id", authenticateToken, updateSweet);
router.delete("/:id", authenticateToken, requireAdmin, deleteSweet);
router.post("/:id/purchase", authenticateToken, purchaseSweet);

export default router;
