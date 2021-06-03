import { Response, Request, NextFunction } from "express";
import { NotAuthorizedError } from "../common/errors/NotAuthorizedError";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.currentUser)
        throw new NotAuthorizedError("You must be logged in.");
    next();
};
