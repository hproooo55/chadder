import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'
import toast from 'react-hot-toast'
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.MODE === "developement" ? "http://localhost:4000": "/"

export const useAuthStore = create((set, get)=>({
    authUser:null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,
    checkAuth: async() => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser: res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth: ", error)
            set({authUser: null})
        }finally{
            set({isCheckingAuth: false})
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });
        try {
          const response = await axiosInstance.post('/auth/signup', data);
          set({ authUser: response.data });
          toast.success("Account created successfully");
        } catch (error) {
          console.log(error);
          const errorMessage = error.response?.data?.message || "An error occurred during signup";
          toast.error(errorMessage);
        } finally {
          set({ isSigningUp: false });
        }
      },

      logout: async() => {
        try{
            await axiosInstance.get('/auth/logout');
            set({ authUser:null });
            toast.success("Logged out successfully")
            get().disconnectSocket()
        }catch(error){
            toast.error(error.response?.data?.message || "An error occured during logout")
        }
      },

      login: async(data) => {
        set({isLoggingIn: true})
        try {
          const response =  await axiosInstance.post('/auth/login', data)
          set({authUser: response.data})
          toast.success("Logged in Successfully")

          get().connectSocket()
        } catch (error) {
          toast.error(`${error.response?.data?.message || "An error occured during login"}`)
        }finally{
          set({isLoggingIn:false})
        }
      },

      updateProfile: async(data)=>{
        set({isUpdatingProfile:true})
        try {
          const res = await axiosInstance.put('/auth/update-profile', data)
          set({authUser:res.data})
          toast.success("Profile updated successfully")
        } catch (error) {
          console.log('error in updating profile', error)
          toast.error(error.response?.data?.message)
        }finally{
          set({isUpdatingProfile:false})
        }
      },

      connectSocket: ()=>{
        const {authUser} = get()
        if(!authUser || get().socket?.connected) return
        const socket = io(BASE_URL, {
          query: {
            userId: authUser._id
          }
        })
        socket.connect()

        set({socket})

        socket.on('getOnlineUsers', (usersIds)=>{
          set({onlineUsers: usersIds})
        })
      },

      disconnectSocket: ()=>{
        if(get().socket?.connected) get().socket.disconnect()
      }

}))