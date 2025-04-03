import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    price: number;
    stock: number;
    vendorId: mongoose.Schema.Types.ObjectId;
    category: string;
    createdAt: Date;
}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, required: true },
        vendorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        category: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
