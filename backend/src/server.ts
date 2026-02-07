import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import TaskRouter from "@/routers/Task.router.js"
import UserRouter from "@/routers/User.router.js"
import connectDB from "@/utils/db.js"
import cookieParser from "cookie-parser";

dotenv.config({ debug: true });


const app = express();
const port = process.env.PORT || 3000;



app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true, // Allow cookies to be sent in cross-origin requests
}));
app.use(express.json());

app.use("/tasks", TaskRouter)
app.use("/auth", UserRouter)

app.listen(port, () => {
    connectDB()
    console.log(`server listening on port ${port}`)
})
