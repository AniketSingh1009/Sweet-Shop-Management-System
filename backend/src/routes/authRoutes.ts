import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
  // Minimal implementation for GREEN phase
  return res.status(201).json({
    token: "dummy-token"
  });
});

export default router;
