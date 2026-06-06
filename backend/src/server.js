import express from "express";
import dotenv from "dotenv";
import AuthRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import path from "path";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser"
dotenv.config();
import cors from "cors"
import { app ,server } from "./lib/socket.js";

// const app = express();
connectDB()
app.use(express.json({
   limit:"10mb"
}))
app.use(cookieParser())
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))

console.log(process.env.CLIENT_URL)

const __dirname = path.resolve();
console.log(path.join(__dirname, "../frontend", "dist","index.html"))

// app.get("/",(req,res)=>{
//   res.send("backend working")
// })
 
app.use("/api/auth",AuthRoutes)

app.use("/api/messages",messageRoutes)

if(process.env.NODE_ENV==="production")
{
  app.use(express.static(path.join(__dirname,"../frontend/dist")))
   
    app.get((req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist","index.html"))
    })
}


const PORT = process.env.PORT    


server.listen(PORT,()=>console.log("server is running on port : "+ PORT))   