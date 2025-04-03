import express from "express";
import { createProduct, updateProduct, deleteProduct } from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";
import { roleMiddleware } from "../middleware/roleMiddleware";

const router = express.Router();


router.post("/", authMiddleware, roleMiddleware(["vendor"]), createProduct);
router.put("/:id", authMiddleware, roleMiddleware(["vendor"]), updateProduct);
router.delete("/:id", authMiddleware, roleMiddleware(["vendor"]), deleteProduct);

export default router;
