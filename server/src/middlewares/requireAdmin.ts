import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../common/errors/NotAuthorizedError";

export const requireAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser || !req.currentUser.isAdmin)
        throw new NotAuthorizedError("You are not authorized.");
    next();
};
