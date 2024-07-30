import mongoose, { ConnectOptions } from "mongoose";

export const dbConnection = async () => {
    try {
        console.log(process.env.DATABASE_URL);
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL); is not defined');
        }
        const conn = await mongoose.connect(
            process.env.DATABASE_URL
        );
        console.log(`MongoDB Connected: ${conn.connection.name}`);
    } catch (error) {
        console.log(error.message);
    }
};