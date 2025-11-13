import express from "express";

const app = express();

app.use(express.json());

// Temporary route so app doesn't crash
app.get("/", (_req, res) => {
  res.send("Sweet Shop API running");
});

export default app;
