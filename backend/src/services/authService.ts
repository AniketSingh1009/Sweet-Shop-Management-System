import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, saveUser } from "../repositories/userRepository";
import { User } from "../types/User";

export const registerUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const exists = await findUserByEmail(email);
  if (exists) return { error: "duplicate" };

  const hashed = await bcrypt.hash(password, 10);

  // Determine role based on email (admin if email contains 'admin')
  const role = email.toLowerCase().includes('admin') ? 'admin' : 'user';

  await saveUser({ email, password: hashed, role });

  const token = jwt.sign({ email, role }, process.env.JWT_SECRET || "test-secret");

  return { token };
};

export const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const user = await findUserByEmail(email);
  if (!user) return { error: "invalid" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) return { error: "invalid" };

  const token = jwt.sign({ email, role: user.role || "user" }, process.env.JWT_SECRET || "test-secret");

  return { token };
};
