import mongoose from "mongoose";
// adjust path if needed
import dotenv from "dotenv";
import { Product } from "../models/prodectModels";
import { connect } from "http2";
import { connectDB } from "../config/db";

dotenv.config();

async function seedProducts() {
  try {
    await connectDB();

    console.log("✅ Connected to MongoDB");

    const sampleProducts = [
      {
        title: "Classic White T-Shirt",
       
        quantity: 100,
        category: "Clothing",
        price: 19.99,
        description: "Soft cotton t-shirt in classic white color.",
        color: "White",
        size: "M",
        brand: "H&M",
      },
      {
        title: "Wireless Headphones",
       
        quantity: 50,
        category: "Electronics",
        price: 89.99,
        description: "Noise-cancelling wireless headphones with 20h battery.",
        brand: "Sony",
        color: "Black",
      },
      {
        title: "Running Shoes",
        
        quantity: 80,
        category: "Footwear",
        price: 59.99,
        description: "Lightweight running shoes with breathable mesh.",
        color: "Blue",
        size: "42",
        brand: "Nike",
      },
      {
        title: "Smart Watch",
        
        quantity: 60,
        category: "Electronics",
        price: 129.99,
        description: "Fitness tracker and smartwatch with heart rate monitor.",
        brand: "Apple",
        color: "Silver",
      },
      {
        title: "Leather Wallet",
      
        quantity: 200,
        category: "Accessories",
        price: 24.99,
        description: "Genuine leather wallet with multiple card slots.",
        color: "Brown",
        brand: "Gucci",
      },
      {
        title: "Bluetooth Speaker",
       
        quantity: 70,
        category: "Electronics",
        price: 45.99,
        description: "Portable Bluetooth speaker with deep bass.",
        brand: "JBL",
        color: "Red",
      },
      {
        title: "Denim Jeans",
        
        quantity: 90,
        category: "Clothing",
        price: 49.99,
        description: "Slim-fit denim jeans made with stretch fabric.",
        size: "L",
        color: "Blue",
        brand: "Levi's",
      },
      {
        title: "Sunglasses",
        
        quantity: 120,
        category: "Accessories",
        price: 39.99,
        description: "UV400 protection polarized sunglasses.",
        color: "Black",
        brand: "Ray-Ban",
      },
      {
        title: "Laptop Backpack",
       
        quantity: 60,
        category: "Accessories",
        price: 54.99,
        description: "Water-resistant laptop backpack with USB charging port.",
        color: "Gray",
        brand: "Samsonite",
      },
      {
        title: "Wireless Mouse",
        
        quantity: 150,
        category: "Electronics",
        price: 14.99,
        description: "Ergonomic wireless mouse with adjustable DPI.",
        brand: "Logitech",
        color: "Black",
      },
      {
        title: "Mechanical Keyboard",
        
        quantity: 80,
        category: "Electronics",
        price: 79.99,
        description: "RGB backlit mechanical keyboard with blue switches.",
        brand: "Corsair",
        color: "Black",
      },
      {
        title: "Hoodie Sweatshirt",
        
        quantity: 100,
        category: "Clothing",
        price: 34.99,
        description: "Soft fleece hoodie with front pocket.",
        color: "Gray",
        size: "XL",
        brand: "Adidas",
      },
      {
        title: "Smartphone Case",

        quantity: 250,
        category: "Accessories",
        price: 12.99,
        description: "Shockproof phone case compatible with iPhone 14.",
        color: "Transparent",
        brand: "Spigen",
      },
      {
        title: "Gaming Chair",
      
        quantity: 30,
        category: "Furniture",
        price: 199.99,
        description: "Ergonomic gaming chair with adjustable armrests.",
        color: "Black/Red",
        brand: "Secretlab",
      },
      {
        title: "Coffee Maker",
    
        quantity: 40,
        category: "Home Appliances",
        price: 69.99,
        description: "Automatic drip coffee maker with 1.5L capacity.",
        brand: "Philips",
        color: "Black",
      },
      {
        title: "Stainless Steel Water Bottle",
        
        quantity: 300,
        category: "Accessories",
        price: 15.99,
        description: "Keeps liquids cold for 24h or hot for 12h.",
        color: "Silver",
        brand: "Hydro Flask",
      },
      
    ];

    await Product.deleteMany(); // optional: clears old products
    await Product.insertMany(sampleProducts);
    console.log("✅ 20 products inserted successfully!");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seedProducts();
