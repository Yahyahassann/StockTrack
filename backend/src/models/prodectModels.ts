import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  images?: string[];       
  quantity: number;
  category: string;
  price: number;
  description?: string;
  color?: string;
  size?: string;
  brand?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    brand: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>("Product", ProductSchema);
