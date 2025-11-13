import express from "express";
import authRoutes from "./routes/authRoutes"; // IMPORTANT: .js extension for ESM output

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

export default app;
