import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  email: string;
  password: string; // hashed password
}

const users: User[] = []; // temporary in-memory store

export const registerUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  // Duplicate email check
  const exists = users.find((u) => u.email === email);
  if (exists) {
    return { error: "duplicate" };
  }

  // Hash password
  const hashed = await bcrypt.hash(password, 10);

  // Save user
  users.push({ email, password: hashed });

  // Create JWT
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string);

  return { token };
};

export const loginUser = async (data: { email: string; password: string }) => {
  const { email, password } = data;

  // Find user
  const user = users.find((u) => u.email === email);
  if (!user) {
    return { error: "invalid" };
  }

  // Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return { error: "invalid" };
  }

  // Create JWT
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string);

  return { token };
};
