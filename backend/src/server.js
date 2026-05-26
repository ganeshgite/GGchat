import express from "express";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
const app = express();
dotenv.config();

app.use("/api/auth",AuthRoutes)

app.use("/api/messages",messageRoutes)


const PORT = process.env.PORT


app.listen(PORT,()=>console.log("server is running on port : "+ PORT))