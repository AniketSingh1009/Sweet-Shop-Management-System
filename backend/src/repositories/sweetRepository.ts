import { db } from "../config/db";
import { Sweet } from "../types/Sweet";

export const createSweet = async (sweet: Omit<Sweet, "id">): Promise<Sweet> => {
  const result = await db.query(
    "INSERT INTO sweets (name, category, price, quantity_in_stock) VALUES ($1, $2, $3, $4) RETURNING *",
    [sweet.name, sweet.category, sweet.price, sweet.quantity_in_stock]
  );
  const row = result.rows[0];
  return {
    ...row,
    price: parseFloat(row.price)
  };
};

export const getAllSweets = async (): Promise<Sweet[]> => {
  const result = await db.query("SELECT * FROM sweets");
  return result.rows.map(row => ({
    ...row,
    price: parseFloat(row.price)
  }));
};
