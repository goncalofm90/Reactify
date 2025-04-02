import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// You need to specify dot js in the backend to import with ESmodules
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
connectDB();

// Initialize express app
const app = express();
app.use(express.json());

// Enable colors
colors.enable();

// CORS Middleware
app.use(
  cors({
    origin: "https://reactify-ecru.vercel.app", // Allow all origins for testing
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    preflightContinue: false, // Handle preflight requests automatically
  })
);

// Log CORS for debugging purposes
app.use((req, res, next) => {
  console.log("CORS Settings Applied");
  console.log("Origin:", req.headers.origin);
  next();
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// PayPal configuration endpoint
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Static file handling for uploads
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Basic API response
app.get("/", (req, res) => res.send("API is running"));

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgMagenta.bold
  )
);
