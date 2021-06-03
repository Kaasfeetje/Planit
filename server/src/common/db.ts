import mongoose from "mongoose";

export const connectDB = async () => {
    const connectionString = process.env.MONGO_URI!.replace(
        "<password>",
        process.env.MONGO_PASSWORD!
    );

    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });
};
