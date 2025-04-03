import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
    user?: { role: string };
}

export const roleMiddleware = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
             res.status(403).json({ message: "Access denied. Insufficient permissions." });
            return
        }
        next();
    };
};
