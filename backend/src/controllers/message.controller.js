import cloudinary from "../lib/cloudinary.js";
import Message from "../models/Message.model.js"
import User from "../models/user.model.js"


export const getAllContacts = async (req,res)=>{
    try{
        const loggedInUserId = req.user._id;

        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        
        res.status(200).json(filteredUsers)
    }
    catch(err)
    {
        console.log("Error In Get all Contacts ", err)
        res.status(500).json({message:"Server Error"})

    }
} 

export const getMessagesByUserId = async (req,res)=>{
    try{
        const myId = req.user._id;
        const {id : userToChatId } = req.params

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId}
            ]
        })

        res.status(200).json(messages)
    }
    catch(err)
    {
        console.log("Error In Get Messages Controller ", err)
        res.status(500).json({message:"Internal Error"})

    }
}

export const sendMessage = async (req,res)=>{
    try{
        const text = req.body.text
        const image = req.body.image

        const senderId = req.user._id;
        const {id : receiverId  } = req.params

        if(!text && !image)
        {
           return res.status(400).json({message:"Text or Image is Required "})
        }
        if(senderId.equals(receiverId))
        {
           return res.status(400).json({message:"Cannot send Messages to Yourself "})
        }
        const receiverEists = await User.exists({_id:receiverId})
        if(!receiverEists){
           return res.status(400).json({message:"Receiver not Found "})
        }

        let imageUrl;
        if(image)
        {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save()
        res.status(201).json(newMessage)
    }
    catch(err)
    {
        console.log("Error In sendMessage Controller ", err)
        res.status(500).json({message:"Internal Error"})

    }
}

export const getChatPartners = async (req,res)=>{
    try{
         const loggedInUserId = req.user._id;
         
         const messages = await Message.find({

            $or:[{senderId:loggedInUserId},{receiverId:loggedInUserId}]
         })
 
         const ChatPartnersId =[
            ...new Set(messages.map((msg)=> msg.senderId.toString() === loggedInUserId.toString() ?
         msg.receiverId.toString() : msg.senderId.toString()  ))
         ] 

         const chatPartners = await User.find({_id:{$in:ChatPartnersId}}).select("-password")
         
         
        res.status(201).json(chatPartners)
    }
    catch(err)
    {
        console.log("Error In sendMessage Controller ", err)
        res.status(500).json({message:"Internal Error"})

    }
}



