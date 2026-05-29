import express from "express";
import {signup ,login, logout, updateProfile } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

// router.get("/signup",(req,res)=>{
//    res.send("signup gg")
// })

router.post("/signup", signup )

router.post("/login", login )

router.post("/logout",logout)
router.post("/update-profile" , protectRoute ,updateProfile)
router.post("/check" , protectRoute , (req,res)=>res.status(200).json(req.user) )

export default router