import { Request, Response } from "express";
import { createSweet, getAllSweets, searchSweetsInDb, updateSweetInDb, deleteSweetFromDb, purchaseSweetFromDb } from "../repositories/sweetRepository";

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
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    
    const searchParams = {
      name: name as string,
      category: category as string,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined
    };

    const sweets = await searchSweetsInDb(searchParams);
    return res.status(200).json(sweets);
  } catch (error) {
    return res.status(500).json({ error: "Failed to search sweets" });
  }
};

export const updateSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, category, price, quantity_in_stock } = req.body;

    // Validate price if provided
    if (price !== undefined && isNaN(parseFloat(price))) {
      return res.status(400).json({ error: "Invalid price value" });
    }

    // Validate quantity_in_stock if provided
    if (quantity_in_stock !== undefined && (!Number.isInteger(quantity_in_stock) || quantity_in_stock < 0)) {
      return res.status(400).json({ error: "Invalid quantity_in_stock value" });
    }

    const sweetId = parseInt(id);
    if (isNaN(sweetId)) {
      return res.status(400).json({ error: "Invalid sweet ID" });
    }

    const updatedSweet = await updateSweetInDb(sweetId, {
      name,
      category,
      price,
      quantity_in_stock
    });

    if (!updatedSweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    return res.status(200).json(updatedSweet);
  } catch (error) {
    return res.status(500).json({ error: "Failed to update sweet" });
  }
};

export const deleteSweet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const sweetId = parseInt(id);
    if (isNaN(sweetId)) {
      return res.status(400).json({ error: "Invalid sweet ID" });
    }

    const deleted = await deleteSweetFromDb(sweetId);

    if (!deleted) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    return res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete sweet" });
  }
};

export const purchaseSweet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity) {
    return res.status(400).json({ error: "Quantity is required" });
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: "Quantity must be a positive integer" });
  }

  const sweetId = parseInt(id);
  const updatedSweet = await purchaseSweetFromDb(sweetId, quantity);

  if (!updatedSweet) {
    return res.status(404).json({ error: "Sweet not found" });
  }

  if ("error" in updatedSweet && updatedSweet.error === "insufficient") {
    return res.status(400).json({ error: "Insufficient stock" });
  }

  return res.status(200).json({ message: "Purchase successful", sweet: updatedSweet });
};
