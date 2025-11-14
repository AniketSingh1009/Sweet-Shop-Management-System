import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../types/User";
import { findUserByEmail, saveUser } from "../repositories/userRepository";

export const registerUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  // Duplicate email
  const exists = findUserByEmail(email);
  if (exists) {
    return { error: "duplicate" };
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10);
  const newUser: User = { email, password: hashed };

  // Save user
  saveUser(newUser);

  // Sign token
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string);

  return { token };
};

export const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const user = findUserByEmail(email);
  if (!user) {
    return { error: "invalid" };
  }

  // Password check
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return { error: "invalid" };
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET as string);

  return { token };
};
