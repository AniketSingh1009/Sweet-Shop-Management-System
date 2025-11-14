import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, saveUser } from "../repositories/userRepository";
import { User } from "../types/User";

export const registerUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const exists = await findUserByEmail(email);
  if (exists) return { error: "duplicate" };

  const hashed = await bcrypt.hash(password, 10);

  await saveUser({ email, password: hashed });

  const token = jwt.sign({ email }, process.env.JWT_SECRET || "test-secret");

  return { token };
};

export const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  const user = await findUserByEmail(email);
  if (!user) return { error: "invalid" };

  const match = await bcrypt.compare(password, user.password);
  if (!match) return { error: "invalid" };

  const token = jwt.sign({ email }, process.env.JWT_SECRET || "test-secret");

  return { token };
};
