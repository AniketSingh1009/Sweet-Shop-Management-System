import dotenv from "dotenv";
dotenv.config();

import { db } from "./src/config/db";

const sweetsToMakeOutOfStock = [
  "Ferrero Rocher",
  "Cotton Candy",
  "Red Velvet Cake Slice",
  "Caramel Popcorn",
  "Almond Toffee"
];

(async () => {
  try {
    console.log("🔄 Updating stock quantities...\n");

    for (const sweetName of sweetsToMakeOutOfStock) {
      const result = await db.query(
        "UPDATE sweets SET quantity_in_stock = 0 WHERE name = $1 RETURNING *",
        [sweetName]
      );
      
      if (result.rows.length > 0) {
        console.log(`❌ Out of Stock: ${sweetName}`);
      }
    }

    // Also set some sweets to low stock (less than 10)
    const lowStockSweets = [
      { name: "White Chocolate Hearts", quantity: 5 },
      { name: "Rainbow Swirl Lollipop", quantity: 8 },
      { name: "Vanilla Cupcake", quantity: 3 }
    ];

    for (const sweet of lowStockSweets) {
      const result = await db.query(
        "UPDATE sweets SET quantity_in_stock = $1 WHERE name = $2 RETURNING *",
        [sweet.quantity, sweet.name]
      );
      
      if (result.rows.length > 0) {
        console.log(`⚠️  Low Stock: ${sweet.name} (${sweet.quantity} left)`);
      }
    }

    console.log("\n✅ Stock update completed!");
    
    // Show summary
    const outOfStock = await db.query("SELECT COUNT(*) FROM sweets WHERE quantity_in_stock = 0");
    const lowStock = await db.query("SELECT COUNT(*) FROM sweets WHERE quantity_in_stock > 0 AND quantity_in_stock < 10");
    const inStock = await db.query("SELECT COUNT(*) FROM sweets WHERE quantity_in_stock >= 10");
    
    console.log("\n📊 Stock Summary:");
    console.log(`   ❌ Out of Stock: ${outOfStock.rows[0].count}`);
    console.log(`   ⚠️  Low Stock: ${lowStock.rows[0].count}`);
    console.log(`   ✅ In Stock: ${inStock.rows[0].count}`);

  } catch (err) {
    console.error("❌ Update error:", err);
  } finally {
    await db.end();
  }
})();
