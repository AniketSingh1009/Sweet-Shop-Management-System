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

interface UpdateSweetParams {
  name?: string;
  category?: string;
  price?: number;
  quantity_in_stock?: number;
}

export const updateSweetInDb = async (id: number, params: UpdateSweetParams): Promise<Sweet | null> => {
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (params.name !== undefined) {
    updates.push(`name = $${paramIndex}`);
    values.push(params.name);
    paramIndex++;
  }

  if (params.category !== undefined) {
    updates.push(`category = $${paramIndex}`);
    values.push(params.category);
    paramIndex++;
  }

  if (params.price !== undefined) {
    updates.push(`price = $${paramIndex}`);
    values.push(params.price);
    paramIndex++;
  }

  if (params.quantity_in_stock !== undefined) {
    updates.push(`quantity_in_stock = $${paramIndex}`);
    values.push(params.quantity_in_stock);
    paramIndex++;
  }

  if (updates.length === 0) {
    const result = await db.query("SELECT * FROM sweets WHERE id = $1", [id]);
    if (result.rows.length === 0) return null;
    return {
      ...result.rows[0],
      price: parseFloat(result.rows[0].price)
    };
  }

  values.push(id);
  const query = `UPDATE sweets SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`;

  const result = await db.query(query, values);
  
  if (result.rows.length === 0) {
    return null;
  }

  return {
    ...result.rows[0],
    price: parseFloat(result.rows[0].price)
  };
};

export const deleteSweetFromDb = async (id: number): Promise<boolean> => {
  const result = await db.query("DELETE FROM sweets WHERE id = $1 RETURNING *", [id]);
  return result.rows.length > 0;
};

export const purchaseSweetFromDb = async (id: number, quantity: number): Promise<Sweet | null | { error: string }> => {
  // Get current sweet
  const checkResult = await db.query("SELECT * FROM sweets WHERE id = $1", [id]);
  
  if (checkResult.rows.length === 0) {
    return null;
  }

  const currentSweet = checkResult.rows[0];
  const currentStock = currentSweet.quantity_in_stock;

  if (currentStock < quantity) {
    return { error: "insufficient" };
  }

  // Update quantity
  const result = await db.query(
    "UPDATE sweets SET quantity_in_stock = quantity_in_stock - $1 WHERE id = $2 RETURNING *",
    [quantity, id]
  );

  return {
    ...result.rows[0],
    price: parseFloat(result.rows[0].price)
  };
};
