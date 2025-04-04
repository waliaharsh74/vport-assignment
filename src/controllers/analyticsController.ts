import { Request, Response } from "express";
import Order from "../models/Order";
import Product from "../models/Product";
import mongoose from "mongoose";
export const getAdminAnalytics = async (req: Request, res: Response) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const revenue = await Order.aggregate([
            { $match: { createdAt: { $gte: thirtyDaysAgo } } },
            { $unwind: "$subOrders" },
            {
                $group: {
                    _id: "$subOrders.vendorId",
                    totalRevenue: { $sum: "$subOrders.total" },
                },
            },
        ]);

        
        const topProducts = await Order.aggregate([
            { $unwind: "$subOrders" },
            { $unwind: "$subOrders.items" },
            {
                $group: {
                    _id: "$subOrders.items.productId",
                    totalSold: { $sum: "$subOrders.items.quantity" },
                },
            },
            { $sort: { totalSold: -1 } },
            { $limit: 5 },
        ]);

      
        const avgOrderValue = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    avgValue: { $avg: "$total" },
                },
            },
        ]);

        res.json({
            revenue,
            topProducts,
            averageOrderValue: avgOrderValue[0]?.avgValue || 0,
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch admin analytics", error });
    }
};
export const getVendorAnalytics = async (req: Request, res: Response) => {
    try {
        const vendorId = (req as any).user.id;
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Daily sales (last 7 days)
        const dailySales = await Order.aggregate([
            { $unwind: "$subOrders" },
            { $match: { "subOrders.vendorId": new mongoose.Types.ObjectId(vendorId), createdAt: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalSales: { $sum: "$subOrders.total" },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        // Low-stock items
        const lowStockProducts = await Product.find({ vendorId, stock: { $lt: 10 } });

        res.json({ dailySales, lowStockProducts });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch vendor analytics", error });
    }
};