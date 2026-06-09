import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail, sendOTPEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";
import { Resend } from "resend";
import Otp from "../models/otp.model.js";

export const signup = async (req, res) => {
  const { fullName, email, password, profilePic } = req.body;
  console.log("signup");
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All Fields are Required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password Must be at least 6 Characters " });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      fullName,
      profilePic,
    });
    if (newUser) {
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,

        profilePic: newUser.profilePic,
      });

      // send a wellcome email to user

      try {
        await sendWelcomeEmail(
          savedUser.email,
          savedUser.fullName,
          process.env.CLIENT_URL,
        );
      } catch (err) {
        console.log("Error to send wellcome email ", err);
      }
    } else {
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (err) {
    console.log("Error in signup controller", err);
    res.status(500).json({ message: "internal server error" });
  }
};

export const generateOTP = async (req, res) => {
 

  const { email } = req.body;

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await sendOTPEmail(email, otp);
    await Otp.deleteMany({ email });

    const otpData = new Otp({
      email,
      otp, 
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    const savedOtp = await otpData.save();

    res.status(201).json({ message: "OTP sent successfully To Email " });
  } catch (err) {
    console.log("Error in Generate OTP", err);
    res.status(500).json({ message: "internal server error" });
  }
};

export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(404).json({
        message: "User already Exists Please Login",
      });
    }

    const otpData = await Otp.findOne({ email });
    if (!otpData) {
      return res.status(404).json({
        message: "OTP not found",
      });
    }
    if (new Date(otpData.expiresAt).getTime() < Date.now()) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }
    console.log("Saved OTP:", otpData.otp);
    console.log("Entered OTP:", otp);

    console.log("Saved expiresAt:", otpData.expiresAt);
    console.log("Current Time:", Date.now());
    if (otpData.otp.toString() !== otp.toString()) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    await Otp.deleteMany({ email });

    res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (err) {
    console.log("Error in Verify OTP", err);
    res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and Password Required" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid Credentials" });

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (err) {
    console.log("Error In login controller ", err);
    res.status(500).json({ message: "Internal Error" });
  }
};

export const logout = (req, res) => {
  const token = res.cookie("token", "");

  res.status(200).json({ message: " Logout Successfully" });
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({
        message: "Profile Pic is Required",
      });
    }

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,

      {
        profilePic: uploadResponse.secure_url,
      },

      {
        new: true,
      },
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("Error In update profile ", err);

    res.status(500).json({
      message: "Internal Error",
    });
  }
};
