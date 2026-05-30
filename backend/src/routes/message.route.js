import express from "express";
import { getAllContacts ,sendMessage,getChatPartners , getMessagesByUserId} from "../controllers/message.controller.js";
import { protectRoute  } from "../middlewares/auth.middleware.js";
import { arcjetProtection } from "../middlewares/arcject.middleware.js";
const router = express.Router();

router.use(arcjetProtection,protectRoute)

router.get("/contacts" ,getAllContacts)
router.get("/chats",getChatPartners)
router.get("/:id" , getMessagesByUserId)

router.post("/send/:id",sendMessage)

// router.get("/gg",(req,res)=>{
//     res.send("messege send")
// })   

export default router;



