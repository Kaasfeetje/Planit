import { CustomError } from "./CustomError";

export class NoPermissionError extends CustomError {
    statusCode = 403;

    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, NoPermissionError.prototype);
    }

    serializeErrors() {
        return this.message;
    }
}
