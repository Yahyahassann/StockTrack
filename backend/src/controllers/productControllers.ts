import { Request, Response } from "express";
import { Product } from "../models/prodectModels";


// Create product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    res.status(400).json({ message });
  }
};

// Get all products (with optional search & filter)
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, category } = req.query as { search?: string; category?: string };

    const filter: Record<string, any> = {};
    if (search) filter.title = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    const products = await Product.find(filter);
    res.json(products);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    res.status(500).json({ message });
  }
};

// Get single product by ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    res.status(500).json({ message });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    res.status(400).json({ message });
  }
};

// Delete product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    res.status(500).json({ message });
  }
};
