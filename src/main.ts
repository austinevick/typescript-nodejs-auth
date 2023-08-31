import express from "express";
import { connectToDB } from "./utils/db";
import dotenv from 'dotenv';
import UserRouter from "./modules/user/user.route";
dotenv.config();
const app = express();

const port = 3000

app.use(express.json())
app.use(express.raw())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/users", UserRouter)

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