import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// Fetch all products from DB
// GET /api/products
// Public route
const getProducts = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await Product.find({ ...keyword });
  res.json(products);
});

// Fetch single products from DB
// GET /api/products/:id
// Public route
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Delete product from DB
// Delete /api/products/:id
// Private Admin route
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed." });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// Create a product in DB
// Post /api/products/
// Private Admin route
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "sample",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "sample category",
    countInStock: 0,
    numReviews: 0,
    description: "sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// Update a product in DB
// Put /api/products/:id
// Private Admin route
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.status(201).json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

// Create new review
// Post /api/products/:id/reviews
// Private  route
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed.");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    //get number of reviews
    product.numReviews = product.reviews.length;
    product.rating =
      //get average reviews
      product.reviews.reduce((acc, curr) => curr.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review posted." });
  } else {
    res.status(404);
    throw new Error("Product not found.");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
};
