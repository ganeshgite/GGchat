import jwt  from "jsonwebtoken"
import User from "../models/user.model.js";

export const protectRoute = async (req,res,next)=>{

    try{
        // console.log(req.cookies)
        const token = req.cookies.token
        if(!token) return res.status(401).json({message:"Unauthorized - NO Token Provided"});
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded) return res.status(401).json({message:"Unauthorized - Invalid Token"});
        
        const user = await User.findById(decoded.userId).select("-password")
        if(!user) return res.status(401).json({message:"user not found"});

        req.user = user
        next()

    }
    catch(err)
    {
        console.log("Error In authmiddleware protectRoute ", err)
        res.status(500).json({message:"Internal Error"})
        
    }
} 