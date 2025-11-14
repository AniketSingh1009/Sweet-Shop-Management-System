import dotenv from "dotenv";
dotenv.config();

import { db } from "./src/config/db.js";

(async () => {
  try {
    console.log("Creating users table...");
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log("✅ Users table created successfully");
    
    // Check if table exists
    const result = await db.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users'
    `);
    
    console.log("\nTable structure:");
    console.table(result.rows);
    
  } catch (err) {
    console.error("❌ Database setup error:", err);
  } finally {
    await db.end();
  }
})();
