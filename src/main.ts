import express from "express";
import { connectToDB } from "./utils/db";
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import userRoute from "./modules/user/user.route";
import authRoute from "./modules/auth/auth.route";
import { deserializeUser } from "./middleware/deserializeUser";
import videoRoute from "./modules/videos/video.route";
dotenv.config();
const app = express();

const port = 3000
app.use(cookieParser())
app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/users", userRoute)
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/videos", videoRoute)

app.use(deserializeUser);

const server = app.listen(port, async () => {
    await connectToDB();
    console.log(`Server running on port ${port}`)
});

const signals = ['SIGTERM', 'SIGINT'];

function gracefulShutdown(signal: string) {
    process.on(signal, async () => {
        server.close();

        process.exit(0);
    });
}

for (let i = 0; i < signals.length; i++) {
    gracefulShutdown(signals[i]);
}