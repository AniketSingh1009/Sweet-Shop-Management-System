import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = (req: Request, res: Response) => {
  const token = registerUser(req.body);
  return res.status(201).json({ token });
};

export const login = (req: Request, res: Response) => {
  const token = loginUser(req.body);
  return res.status(200).json({ token });
};
