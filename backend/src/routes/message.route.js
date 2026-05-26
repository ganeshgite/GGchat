import express from "express";
const router = express.Router();

router.get("/gg",(req,res)=>{
    res.send("messege send")
})

export default router;



