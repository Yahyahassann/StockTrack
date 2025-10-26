import express,{ Request, Response } from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productControllers";

import { upload } from "../middlewares/uploadMiddleware";
import { Product } from "../models/prodectModels";
const router = express.Router();

router.post("/", createProduct);       // Create
router.get("/", getProducts);          // Read all (with search/filter)
router.get("/:id", getProduct);        // Read one
router.put("/:id", updateProduct);     // Update
router.delete("/:id", deleteProduct);  // Delete

router.post("/:id/images", upload.array("images", 10), async (req:Request, res:Response) => {
  try {
    const files = (req.files as Express.Multer.File[]) || [];
    if (!files.length) return res.status(400).json({ message: "No file(s) uploaded" });

    // Store relative paths instead of full URLs for flexibility
    const urls = files.map((f) => `/uploads/${f.filename}`);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $push: { images: { $each: urls } } },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(201).json({ product, added: urls });
  } catch (e: any) {
    res.status(500).json({ message: e.message || "Upload failed" });
  }
});

router.delete("/:id/images", async (req:Request, res:Response) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ message: "Image URL is required" });

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $pull: { images: imageUrl } },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product, message: "Image removed successfully" });
  } catch (e: any) {
    res.status(500).json({ message: e.message || "Failed to remove image" });
  }
});

export default router;
