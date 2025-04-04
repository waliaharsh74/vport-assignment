import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import orderRoutes from "./routes/orderRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(helmet());

connectDB();




app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/analytics", analyticsRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app