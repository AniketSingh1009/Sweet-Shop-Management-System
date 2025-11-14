import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  const result = await registerUser(req.body);

  if (result.error === "duplicate") {
    return res.status(409).json({ message: "Email already exists" });
  }

  return res.status(201).json({ token: result.token });
};

export const login = async (req: Request, res: Response) => {
  const result = await loginUser(req.body);

  if (result.error === "invalid") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.status(200).json({ token: result.token });
};
