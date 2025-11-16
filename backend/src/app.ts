import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import sweetRoutes from "./routes/sweetRoutes";
import { db } from "./config/db";

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

// Database health check endpoint
app.get("/api/health/db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW() as time, current_database() as database");
    const tables = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    res.json({ 
      status: "connected",
      time: result.rows[0].time,
      database: result.rows[0].database,
      tables: tables.rows.map(t => t.table_name)
    });
  } catch (error: any) {
    res.status(500).json({ 
      status: "error",
      message: error.message,
      pgUrl: process.env.PG_URL ? "SET" : "NOT SET"
    });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sweets", sweetRoutes);

export default app;
