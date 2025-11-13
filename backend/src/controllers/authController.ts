import { Request, Response } from "express";

export const register = (_req: Request, res: Response) => {
  // Minimal valid implementation (same behavior as before)
  return res.status(201).json({
    token: "dummy-token"
  });
};
