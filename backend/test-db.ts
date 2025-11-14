import dotenv from "dotenv";
dotenv.config();

console.log("PG_URL:", process.env.PG_URL);

import { db } from "./src/config/db.ts";

(async () => {
  try {
    const res = await db.query("SELECT 1+1 AS result");
    console.log("DB OK:", res.rows);
  } catch (err) {
    console.error("DB ERROR:", err);
  } finally {
    await db.end();
  }
})();
