import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { generateToken } from "../lib/utils.js";

export  const signup = async (req,res)=>{
    const {fullName,email,password,profilePic} = req.body;
    console.log("signup")
    try{
        

        if(!fullName || !email || !password )
        {
            return res.status(400).json({message:"All Fields are Required"})
        }
        if(password.length < 6)
        {
            return res.status(400).json({message:"Password Must be at least 6 Characters "})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if(!emailRegex.test(email))
        {
            return res.status(400).json({message:"Invalid Email Format"})
        }
 
const user = await User.findOne({ email })
        if(user){
            return res.status(400).json({message:"Email already Exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            email,
            password:hashedPassword,
            fullName,
            profilePic
        })
        if(newUser)
        {
            generateToken(newUser._id,res)
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                
                profilePic:newUser.profilePic

            })
        }
        else{  
            res.status(400).json({message:"Invalid User Data"})
        }

    }
    catch(err)
    {
        console.log("Error in signup controller", err)
        res.status(500).json({message:"internal server error"})
    }
}