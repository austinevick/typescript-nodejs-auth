import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGO_URI;

export async function connectToDB() {
    try {
        await mongoose.connect(`${URI}`);
        console.log("Connect to database");
    } catch (error) {
        console.error(error, "Failed to connect to db");
        process.exit(1)
    }

}