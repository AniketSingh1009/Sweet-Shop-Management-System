import { db } from "../config/db";
import { User } from "../types/User";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  console.log("FIND USER:", email);

  const result = await db.query(
    "SELECT email, password, role FROM users WHERE email = $1 LIMIT 1",
    [email]
  );

  if (result.rows.length === 0) return null;

  return {
    email: result.rows[0].email,
    password: result.rows[0].password,
    role: result.rows[0].role,
  };
};

export const saveUser = async (user: User): Promise<void> => {
  await db.query(
    "INSERT INTO users (email, password) VALUES ($1, $2)",
    [user.email, user.password]
  );
};
