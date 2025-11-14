import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoutes from "./routes/authRoutes"; // IMPORTANT: .js for TS->ESM

const app = express();


app.use(express.json());
app.use("/api/auth", authRoutes);

export default app;
