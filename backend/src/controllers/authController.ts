import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

// ✅ Email validator (simple and effective)
const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

// ✅ Password validator (minimum 6 chars)
const isValidPassword = (password: string) => password.length >= 6;

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 🔍 VALIDATION (matches your tests)
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!isValidPassword(password)) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  try {
    const result = await registerUser(req.body);

    if (result.error === "duplicate") {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(201).json({ token: result.token });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // 🔍 SAME VALIDATION IN LOGIN
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!isValidPassword(password)) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  try {
    const result = await loginUser(req.body);

    if (result.error === "invalid") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({ token: result.token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
