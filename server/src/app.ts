import express, { NextFunction, Response, Request } from "express";
import morgan from "morgan";

const app = express();

if ((process.env.NODE_ENV = "development")) {
    app.use(morgan("dev"));
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("Error handler");
    res.status(500).send("Something went wrong");
});

export { app };
