import mongoose, { Schema, Document } from "mongoose";

interface IOrderItem {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

export interface IOrder extends Document {
    customerId: mongoose.Schema.Types.ObjectId;
    vendorId?: mongoose.Schema.Types.ObjectId;
    items: IOrderItem[];
    status: "Pending" | "Completed" | "Cancelled";
    createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
    {
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true },
            },
        ],
        status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model<IOrder>("Order", OrderSchema);
