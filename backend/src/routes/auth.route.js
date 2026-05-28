import express from "express";
import {signup} from "../controllers/auth.controller.js"

const router = express.Router();

router.get("/signup",(req,res)=>{
   res.send("signup gg")
})

router.post("/signup", signup )

router.get("/login",(req,res)=>{
 res.send("login endpoint")
})

router.get("/logout",(req,res)=>{
 res.send("logout endpoint")
})

export default router