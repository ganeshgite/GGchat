import mongoose from "mongoose";

const otpSchema =  mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
   
    otp: {
      type: Number,
      require: true,
      minlength: 6,
    },
    expiresAt:{
    type:Date,
    required:true
  }
},
  {
    timestamps: true,
  },
);

const Otp = new mongoose.model('otp', otpSchema)
export default Otp;