import mongoose from "mongoose";
import User from "./user.model.js";

const MessageSchema =  mongoose.Schema(
  {
    senderId: {
      type:mongoose.Schema.Types.ObjectId  ,
      ref: User,
      required: true,
    },
     receiverId: {
      type:mongoose.Schema.Types.ObjectId  ,
      ref: User,
      required: true,
    },
    text: {
      type: String,
      trim:true,
      maxLength:2000
      
    },
    image: {
      type: String,
      
    },
    
  },
  {
    timestamps: true,
  },
);

const Message = new mongoose.model('Message', MessageSchema)
export default Message;