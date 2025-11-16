import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import sweetRoutes from "./routes/sweetRoutes";

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", // Allow all origins in development
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop API is running!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
