import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user_id?: string;
        }
    }
}

export const authoriseUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authorized, token missing",
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        // attach user info to request
        req.user_id = decoded.id;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token invalid",
        });
    }
};
