import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const {MONGO_URL} = process.env
        if(!MONGO_URL) throw new Error("MONGO_URL is Not Set")

      const conn =  await mongoose.connect(process.env.MONGO_URL)
        console.log("DataBase is Connected : ",conn.connection.host)

    } 
    catch(err){ 
        console.log("DataBase is Not Connected ")
    }
}          