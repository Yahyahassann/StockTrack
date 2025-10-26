import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import cors from "cors";
import productRoutes from "./routes/productRoutes";
import path from "path";
dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 4000;
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
connectDB();
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use("/api/product", productRoutes);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
