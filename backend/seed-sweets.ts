import dotenv from "dotenv";
dotenv.config();

import { db } from "./src/config/db";

const sampleSweets = [
  { name: "Dark Chocolate Bar", category: "Chocolate", price: 45.00, quantity_in_stock: 100 },
  { name: "Milk Chocolate Truffle", category: "Chocolate", price: 60.00, quantity_in_stock: 75 },
  { name: "White Chocolate Hearts", category: "Chocolate", price: 55.00, quantity_in_stock: 50 },
  { name: "Ferrero Rocher", category: "Chocolate", price: 250.00, quantity_in_stock: 30 },
  
  { name: "Rainbow Gummy Bears", category: "Gummy", price: 30.00, quantity_in_stock: 150 },
  { name: "Sour Gummy Worms", category: "Gummy", price: 35.00, quantity_in_stock: 120 },
  { name: "Fruit Gummy Rings", category: "Gummy", price: 25.00, quantity_in_stock: 200 },
  
  { name: "Strawberry Lollipop", category: "Lollipop", price: 15.00, quantity_in_stock: 300 },
  { name: "Cola Lollipop", category: "Lollipop", price: 15.00, quantity_in_stock: 250 },
  { name: "Rainbow Swirl Lollipop", category: "Lollipop", price: 20.00, quantity_in_stock: 180 },
  
  { name: "Butter Toffee", category: "Toffee", price: 40.00, quantity_in_stock: 90 },
  { name: "Chocolate Toffee", category: "Toffee", price: 45.00, quantity_in_stock: 85 },
  { name: "Almond Toffee", category: "Toffee", price: 50.00, quantity_in_stock: 70 },
  
  { name: "Salted Caramel Candy", category: "Caramel", price: 35.00, quantity_in_stock: 110 },
  { name: "Caramel Popcorn", category: "Caramel", price: 80.00, quantity_in_stock: 60 },
  { name: "Caramel Fudge", category: "Caramel", price: 55.00, quantity_in_stock: 75 },
  
  { name: "Peppermint Candy", category: "Candy", price: 20.00, quantity_in_stock: 200 },
  { name: "Cotton Candy", category: "Candy", price: 40.00, quantity_in_stock: 100 },
  { name: "Rock Candy", category: "Candy", price: 25.00, quantity_in_stock: 150 },
  { name: "Fruit Candy Mix", category: "Candy", price: 30.00, quantity_in_stock: 180 },
  
  { name: "Chocolate Chip Cookies", category: "Cookie", price: 50.00, quantity_in_stock: 80 },
  { name: "Butter Cookies", category: "Cookie", price: 45.00, quantity_in_stock: 90 },
  { name: "Oatmeal Cookies", category: "Cookie", price: 40.00, quantity_in_stock: 100 },
  
  { name: "Chocolate Donut", category: "Donut", price: 35.00, quantity_in_stock: 50 },
  { name: "Glazed Donut", category: "Donut", price: 30.00, quantity_in_stock: 60 },
  { name: "Strawberry Donut", category: "Donut", price: 35.00, quantity_in_stock: 55 },
  
  { name: "Vanilla Cupcake", category: "Cake", price: 40.00, quantity_in_stock: 45 },
  { name: "Chocolate Brownie", category: "Cake", price: 45.00, quantity_in_stock: 50 },
  { name: "Red Velvet Cake Slice", category: "Cake", price: 80.00, quantity_in_stock: 30 },
  
  { name: "Fruit Jelly Cups", category: "Jelly", price: 25.00, quantity_in_stock: 140 },
  { name: "Mango Jelly", category: "Jelly", price: 30.00, quantity_in_stock: 120 },
  { name: "Mixed Berry Jelly", category: "Jelly", price: 35.00, quantity_in_stock: 100 },
];

(async () => {
  try {
    console.log("🍬 Starting to seed sweets...\n");

    for (const sweet of sampleSweets) {
      try {
        await db.query(
          "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4)",
          [sweet.name, sweet.category, sweet.price, sweet.quantity_in_stock]
        );
        console.log(`✅ Added: ${sweet.name} - ₹${sweet.price}`);
      } catch (err: any) {
        if (err.code === '23505') {
          console.log(`⚠️  Skipped (already exists): ${sweet.name}`);
        } else {
          console.error(`❌ Error adding ${sweet.name}:`, err.message);
        }
      }
    }

    console.log("\n🎉 Seeding completed!");
    console.log(`📊 Total sweets in database:`);
    
    const result = await db.query("SELECT COUNT(*) FROM sweets");
    console.log(`   ${result.rows[0].count} sweets`);

  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    await db.end();
  }
})();
