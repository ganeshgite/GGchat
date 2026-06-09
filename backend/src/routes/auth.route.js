import express from "express";
import {signup ,login, logout, updateProfile, generateOTP, verifyOTP } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcject.middleware.js";

const router = express.Router();

// router.get("/signup",(req,res)=>{
//    res.send("signup gg")
// })
router.use(arcjetProtection)

router.get("/test",arcjetProtection,(req,res)=>res.send("called"))
 
router.post("/signup", signup )
router.post("/generate-otp", generateOTP )
router.post("/verify-otp", verifyOTP )

router.post("/login",arcjetProtection ,login )

router.post("/logout",logout)
router.put("/update-profile" , protectRoute ,updateProfile)
router.get("/check" , protectRoute , (req,res)=>res.status(200).json(req.user) )
 
export default router