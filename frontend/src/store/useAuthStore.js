import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoginIn: false,
  socket: null,
  onlineUsers: [],
  isVerified: false,
  generateOtp: async (email) => {
    try {
      const res = await axiosInstance.post("/auth/generate-otp", { email });

      if (!res) return toast.error("Failed to Generate Otp");

      return toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || " Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },

  verifyOtp: async (email, otp) => {
    console.log("verify Otp");
    try {
       const res = await axiosInstance.post("/auth/verify-otp", {
      email,
      otp
    });

    console.log(res.data);

    toast.success(res.data.message);

    set({ isVerified: true });

    } catch (err) {
      set({ isVerified: false });
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      set({ isSigningUp: false });
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
       if (get().isVerified) {
        const res = await axiosInstance
          .post("/auth/signup", data)
          .catch((err) => {
            toast.error("Something went wrong");
          });
        // console.log(res)

        set({ authUser: res.data });

        toast.success("Account Created Successfully");
        get().connectSocket();
      } else {
        toast.success("First Verify your Otp");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },
  login: async (data) => {
    set({ isLoginIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data).catch((err) => {
        toast.error("Invalid Email Password");
      });
      // console.log(res)

      set({ authUser: res.data });

      toast.success("Logged In Successfully");
      get().connectSocket();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async (data) => {
    set({ isLoginIn: true });
    try {
      const res = await axiosInstance.post("/auth/logout");
      // console.log(res)

      set({ authUser: null });

      toast.success("Logged Out Successfully");
      get().disconnectSocket();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      set({ isSigningUp: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      // console.log(res)

      set({ authUser: res.data });

      toast.success("Profile updated Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
