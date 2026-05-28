import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
      const conn =  await mongoose.connect(process.env.MONGO_URL)
        console.log("DataBase is Connected : ",conn.connection.host)

    }
    catch(err){
        console.log("DataBase is Not Connected ")
    }
}          