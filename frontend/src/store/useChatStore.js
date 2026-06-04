import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getAllContacts: async () => {
    set({ isUsersLoading: true });
    //  console.log("isUsersLoading : ", get().isUsersLoading)
    try {
      const userContacts = await axiosInstance
        .get("/messages/contacts")
        .then((data) => {
          set({ allContacts: data.data });
        })
        .catch((err) => {
          toast.error(err || "Something went wrong");
        });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/chats", data);
      // console.log(res)

      set({ chats: res.data });
      console.log(chats);
    
      toast.success(" Chat Loaded Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessagesByUserId : async (userId) => {
    set({ isMessagesLoading : true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
          set({ messages: res.data });
      

      toast.success("Logged In Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

}));
