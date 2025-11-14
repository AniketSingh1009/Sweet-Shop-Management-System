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

interface SearchParams {
  name?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const searchSweetsInDb = async (params: SearchParams): Promise<Sweet[]> => {
  let query = "SELECT * FROM sweets WHERE 1=1";
  const values: any[] = [];
  let paramIndex = 1;

  if (params.name) {
    query += ` AND LOWER(name) LIKE LOWER($${paramIndex})`;
    values.push(`%${params.name}%`);
    paramIndex++;
  }

  if (params.category) {
    query += ` AND category = $${paramIndex}`;
    values.push(params.category);
    paramIndex++;
  }

  if (params.minPrice !== undefined) {
    query += ` AND price >= $${paramIndex}`;
    values.push(params.minPrice);
    paramIndex++;
  }

  if (params.maxPrice !== undefined) {
    query += ` AND price <= $${paramIndex}`;
    values.push(params.maxPrice);
    paramIndex++;
  }

  const result = await db.query(query, values);
  return result.rows.map(row => ({
    ...row,
    price: parseFloat(row.price)
  }));
};
