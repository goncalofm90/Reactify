import express from "express";
import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const router = express.Router();

// Fetch all products from DB
// GET /api/products
// Public route
router.get(
  "/",
  AsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

// Fetch single products from DB
// GET /api/products/:id
// Public route
router.get(
  "/:id",
  AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

export default router;
