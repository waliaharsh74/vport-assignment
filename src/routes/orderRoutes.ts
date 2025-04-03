import express from "express";
import { placeOrder } from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();


router.post("/", authMiddleware, roleMiddleware(["customer"]), placeOrder);

export default router;

