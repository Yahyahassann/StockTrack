import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import path from "path";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
connectDB();
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use("/api/product", productRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
