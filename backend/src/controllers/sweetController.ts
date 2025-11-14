import { Request, Response } from "express";
import { createSweet, getAllSweets, searchSweetsInDb } from "../repositories/sweetRepository";

export const addSweet = async (req: Request, res: Response) => {
  try {
    const { name, category, price, quantity_in_stock } = req.body;

    if (!name || !category || price === undefined || quantity_in_stock === undefined) {
      return res.status(400).json({ error: "All fields are required: name, category, price, quantity_in_stock" });
    }

    const newSweet = await createSweet({ name, category, price, quantity_in_stock });
    return res.status(201).json(newSweet);
  } catch (error) {
    return res.status(500).json({ error: "Failed to create sweet" });
  }
};

export const getSweets = async (req: Request, res: Response) => {
  try {
    const sweets = await getAllSweets();
    return res.status(200).json(sweets);
  } catch (error) {
    return res.status(500).json({ error: "Failed to retrieve sweets" });
  }
};

export const searchSweets = async (req: Request, res: Response) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const sweets = await searchSweetsInDb({
    name: name as string,
    category: category as string,
    minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined
  });
  return res.status(200).json(sweets);
};
