import { axiosInstance } from "../lib/axios"
import {create} from "zustand"
import toast from "react-hot-toast"

export const useAuthStore =create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp: false,

    checkAuth : async ()=>{
        try{
            const res = await axiosInstance.get("/auth/check")
            set({authUser : res.data })
        }
        catch(err)
        {
            set({authUser : null })
        }
        finally

        {
            set({isCheckingAuth: false})
        }
    },
    signup : async(data)=>{
        set({isSigningUp:true})
        try{
           
            const res = await axiosInstance.post("/auth/signup",data);
            console.log(res)

            set({authUser:res.data})

            toast.success("Account Created Successfully")
        }
        catch(err)
        {      
            toast.error(  
      err.response?.data?.message
      || "Something went wrong"
   );
        }
        finally{
            set({isSigningUp:false})  
        }

    }
    
}))