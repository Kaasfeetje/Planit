import { CustomError } from "./CustomError";

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return this.message;
    }
}
