import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
    status?: number;
}


export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.error(`[ERROR] ${err.message}`);

    const statusCode = err.status || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};


export const notFoundHandler = (req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
};
