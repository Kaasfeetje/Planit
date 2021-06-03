import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();

import { app } from "./app";
import { connectDB } from "./common/db";

const start = async () => {
    if (!process.env.PORT)
        throw new Error("PORT env variable must be defined.");
    if (!process.env.MONGO_URI)
        throw new Error("MONGO_URI env variable must be defined.");
    if (!process.env.MONGO_PASSWORD)
        throw new Error("MONGO_PASSWORD env variable must be defined.");
    if (!process.env.JWT_SECRET)
        throw new Error("JWT_SECRET env variable must be defined.");

    const PORT = process.env.PORT;

    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

    await connectDB();
    console.log("Connected to database");
};

start();
