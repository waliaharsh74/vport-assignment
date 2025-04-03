import { Request, Response } from "express";
import Product from "../models/Product";
import { AuthRequest } from "../middleware/authMiddleware"; 

export const createProduct = async (req: AuthRequest, res: Response) => {
    try {
        const { name, price, stock, category } = req.body;
        const vendorId = req.user.id;

        const product = new Product({ name, price, stock, category, vendorId });
        await product.save();

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const product = await Product.findByIdAndUpdate(id, updates, { new: true });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return
        }
        res.json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

