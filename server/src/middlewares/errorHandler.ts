import { Request, Response, NextFunction } from "express";
import { CustomError } from "../common/errors/CustomError";

const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof CustomError) {
        return res
            .status(err.statusCode)
            .send({ message: err.serializeErrors() });
    } else if (err.code) {
        console.log("Error Code: " + err.code);
        if (err.code === 11000) {
            const fields = Object.keys(err.keyPattern).join(", ");
            return res.status(404).send({
                message: `Field(s) '${fields}' must be unique.`,
            });
        }
    } else if (err._message) {
        const keys = Object.keys(err.errors).map((error) => error);
        const errors = keys.map((t) => err.errors[t].properties.message);

        return res.status(400).send({ message: errors.join(" ") });
    }

    console.log(err);

    res.status(500).send({ message: "Something went wrong." });
};

export { errorHandler };
