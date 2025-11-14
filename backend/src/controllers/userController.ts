import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    // User is authenticated, req.user contains the decoded JWT payload
    return res.status(200).json({
      email: req.user?.email,
      message: "Profile retrieved successfully"
    });
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
