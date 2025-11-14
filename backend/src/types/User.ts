export interface User {
  email: string;
  password: string; // hashed password
  role?: string;
}
