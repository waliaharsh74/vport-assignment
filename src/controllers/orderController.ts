import { Request, Response } from "express";
import mongoose from "mongoose";
import Order from "../models/Order";
import Product from "../models/Product";
import { AuthRequest } from "../middleware/authMiddleware";

export const placeOrder = async (req: AuthRequest, res: Response) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { items } = req.body;
        const customerId = req.user.id;

        const masterOrder = new Order({ customerId, items: [], status: "Pending" });
        await masterOrder.save({ session });

        const vendorOrders: Record<string, any> = {};

        for (const item of items) {
            const product = await Product.findById(item.productId).session(session);
            if (!product || product.stock < item.quantity) {
                throw new Error(`Insufficient stock for product: ${product?.name || "unknown"}`);
            }

            product.stock -= item.quantity;
            await product.save({ session });

            if (!vendorOrders.product.vendorId) {
                vendorOrders.product.vendorId = { vendorId: product.vendorId, items: [] };
            }
            vendorOrders.product.vendorId.items.push(item);
        }

        for (const vendorId in vendorOrders) {
            const vendorOrder = new Order({
                customerId,
                vendorId,
                items: vendorOrders[vendorId].items,
                status: "Pending",
            });
            await vendorOrder.save({ session });
        }

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        if (error instanceof Error) {
            res.status(500).json({ message: "Order placement failed", error: error.message });
        } else {
            res.status(500).json({ message: "Order placement failed", error: String(error) });
        }
    }
};
