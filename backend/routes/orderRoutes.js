import express from "express";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";
import { addOrderItems, getOrderById } from "../controllers/orderController.js";

router.route("/").post(protect, addOrderItems);
//this should be at the bottom because if you pass anything after it will look at it as an id
router.route("/:id").get(protect, getOrderById);

export default router;
