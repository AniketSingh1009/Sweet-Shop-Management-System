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
    
    console.log("Creating sweets table...");
    
    await db.query(`
      CREATE TABLE IF NOT EXISTS sweets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        category VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        quantity_in_stock INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log("✅ Sweets table created successfully");
    
    // Check if table exists
    const result = await db.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'users'
    `);
    
    console.log("\nUsers table structure:");
    console.table(result.rows);
    
    const sweetsResult = await db.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'sweets'
    `);
    
    console.log("\nSweets table structure:");
    console.table(sweetsResult.rows);
    
  } catch (err) {
    console.error("❌ Database setup error:", err);
  } finally {
    await db.end();
  }
})();
