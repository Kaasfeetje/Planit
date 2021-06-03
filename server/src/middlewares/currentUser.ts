import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserToken } from "../components/user/userModel";
export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.cookies.jwt) return next();

    try {
        const payload = jwt.verify(
            req.cookies.jwt,
            process.env.JWT_SECRET!
        ) as UserToken;
        req.currentUser = payload;
    } catch (err) {}
    next();
};
