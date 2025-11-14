import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerUser(req.body);

    if (result.error === "duplicate") {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(201).json({ token: result.token });
  } catch (err: any) {
    // PostgreSQL duplicate error
    if (err.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }

    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const result = await loginUser(req.body);

    if (result.error === "invalid") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ token: result.token });
  } catch (err: any) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
