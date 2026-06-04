import { axiosInstance } from "../lib/axios"
import {create} from "zustand"
import toast from "react-hot-toast"
 
export const useAuthStore =create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp: false,
    isLoginIn : false,

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
            // console.log(res)

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

    },
    login : async(data)=>{
        set({isLoginIn:true})
        try{
           
            const res = await axiosInstance.post("/auth/login",data);
            // console.log(res)

            set({authUser:res.data})

            toast.success("Logged In Successfully")
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

    },
    logout : async(data)=>{
        set({isLoginIn:true})
        try{
           
            const res = await axiosInstance.post("/auth/logout",data);
            // console.log(res)

            set({authUser:null})

            toast.success("Logged Out Successfully")
        }
        catch(err)
        {      
            toast.error(  err.response?.data?.message || "Something went wrong" );
        }
        finally{
            set({isSigningUp:false})  
        }

    },
    updateProfile : async(data)=>{
       set({ isUpdatingProfile:true });
        try{ 
           
            const res = await axiosInstance.put("/auth/update-profile",data);
            // console.log(res)

            set({authUser:res.data})

            toast.success("Profile updated Successfully")
        }
        catch(err)
        {      
            toast.error( err.response?.data?.message || "Something went wrong"
   );
        }
        finally{
            set({ isUpdatingProfile:false }); 
        }
 
    },
    
}))