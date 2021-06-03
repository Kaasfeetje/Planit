import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { indexRouter } from "./components/indexRouter";
import { errorHandler } from "./middlewares/errorHandler";
import { UserToken } from "./components/user/userModel";

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserToken;
        }
    }
}

const app = express();

//shows requests
if ((process.env.NODE_ENV = "development")) {
    app.use(morgan("dev"));
}

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1/", indexRouter);

//errors
app.use(errorHandler);

export { app };
