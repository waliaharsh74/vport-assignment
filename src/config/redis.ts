import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const REDIS_URL = process.env.REDIS_URL as string;

export const redisClient = createClient({
    url: REDIS_URL,
});

redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
});

export const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log("Connected to Redis Successfully");
    } catch (error) {
        console.error("Failed to connect to Redis:", error);
    }
};
