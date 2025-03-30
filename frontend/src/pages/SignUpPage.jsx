"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "../store/useAuthStore";
import toast from 'react-hot-toast'

export default function SignUpPage() {
  const [formData, setformData] = useState({
    fullName: '',
    email: '',
    password: '',
  })

  const {signup, isSigningUp} = useAuthStore()
  const validateForm = ()=>{
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if(formData.password.length < 6) return toast.error("Password must be at least 6 characters long")

      return true
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm()
    console.log("handle submit")
    if(success===true) signup(formData)      
      
    };
    const toastIdRef = React.useRef(null);
    useEffect(() => {
      if (isSigningUp) {
        toastIdRef.current = toast.loading("Loading");
      } else if (!isSigningUp && toastIdRef.current) {
        toast.dismiss(toastIdRef.current);
      }
    }, [isSigningUp]);

  return (
    <div id="root" className="min-h-screen pt-5">
  <section id="hero" className="px-4 py-16 mx-auto lg:max-w-7xl md:max-w-3xl  sm:px-6 lg:px-8 sm:py-24">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16" id="el-hd8l8lrr">
      <div className="w-full lg:w-1/2 space-y-8 " id="el-lavr7t9z">
        <div className="space-y-4" id="el-3w9nvbxz">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl" id="el-h4a9tmp5">
            <p className="block " >Connect Instantly</p>
            <span className="block text-indigo-600 dark:text-indigo-400" id="el-hm8parb8">with our ChatApp</span>
          </h1>
          <p className="max-w-lg mt-3 text-xl text-neutral-600 dark:text-neutral-300" id="el-43e2brsu">
            Join thousands of users who are already enjoying seamless conversations, group chats, and media sharing with our intuitive chat platform.
          </p>
        </div>

        <div className="pr-6 rounded-2xl " id="el-yxyr4ev7">
          <h2 className="text-2xl font-bold  mb-4" id="el-lqj1cejb">Sign Up Today</h2>
          <form className="space-y-4 " onSubmit={(e)=>{handleSubmit(e)}} id="el-nh68ketj">
            <div id="el-87ukgepf">
              <label htmlfor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300" id="el-q82asmvx">Full Name</label>
              <input type="text" id="name" name="fullName" placeholder="John Doe" className="mt-1 input block w-full px-4 py-3  focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.fullName}
              onChange={(e) => setformData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div id="el-v29j9snz">
              <label htmlfor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300" id="el-g03qxc1i">Email Address</label>
              <input type="email" id="email" name="email" placeholder="john@example.com" className="mt-1 input block w-full px-4 py-3 "
              value={formData.email}
              onChange={(e) => setformData({ ...formData, email: e.target.value })}
              />

            </div>
            <div id="el-zqiclc2s">
              <label htmlfor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300" id="el-1rzetut1">Password</label>
              <input type="password" id="password" name="password" placeholder="••••••••" className="mt-1 block input w-full px-4 py-3 "
              value={formData.password}
              onChange={(e) => setformData({ ...formData, password: e.target.value })}
              />
            </div>
            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium btn focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out" id="el-wd6nst1r">
              Create Your Account
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-neutral-600 dark:text-neutral-400" id="el-mg9gco3q">
            Already have an account? 
            <a href="#" className="font-medium ml-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition duration-150 ease-in-out" id="el-jwnn5c22">
              Sign in
            </a>
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center" id="el-ucn3hzuo">
        <div className="relative" id="el-tn2b2bqi">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 animate-pulse" id="el-3m7rd1dm"></div>
          <div className="relative bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 overflow-hidden" id="el-56jk9gw0">
            <div className="w-full max-w-md" id="el-h0mnju5l">
              <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-neutral-800 dark:to-neutral-700 p-4" id="el-cbsxq8hs">
                <div className="flex items-center mb-4" id="el-zzjub2e0">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold" id="el-94r2xf38">C</div>
                  <h3 className="ml-3 font-semibold text-neutral-900 dark:text-white" id="el-cfqa1gcx">ChatApp</h3>
                  <div className="ml-auto flex space-x-2" id="el-2hwimdb1">
                    <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-600" id="el-d01ed21k"></div>
                    <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-600" id="el-pknhc5kr"></div>
                    <div className="w-3 h-3 rounded-full bg-neutral-300 dark:bg-neutral-600" id="el-49jyncr6"></div>
                  </div>
                </div>
                <div className="space-y-3" id="el-kwkvx0n5">
                  <div className="flex items-start" id="el-dpkoutmw">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0" id="el-s5b7mudd"></div>
                    <div className="ml-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 dark:text-blue-100 rounded-lg rounded-tl-none max-w-xs" id="el-2eunap2j">
                      <p className="text-sm" id="el-lqdyagz6">Hey there! How's it going?</p>
                    </div>
                  </div>
                  <div className="flex items-start flex-row-reverse" id="el-xdg92qpe">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex-shrink-0" id="el-yjit6zl3"></div>
                    <div className="mr-2 px-3 py-2 bg-purple-100 dark:bg-purple-900 dark:text-purple-100 rounded-lg rounded-tr-none max-w-xs" id="el-92z7mef8">
                      <p className="text-sm" id="el-q2zuyt3v">Great! Just checking out this new chat app. It's amazing!</p>
                    </div>
                  </div>
                  <div className="flex items-start" id="el-tt1nc1co">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex-shrink-0" id="el-bqwxmq0g"></div>
                    <div className="ml-2 px-3 py-2 bg-blue-100 dark:bg-blue-900 dark:text-blue-100 rounded-lg rounded-tl-none max-w-xs" id="el-203gw9ss">
                      <p className="text-sm" id="el-h2i5v89u">I know right? The UI is so clean and intuitive!</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center border border-neutral-200 dark:border-neutral-600 rounded-full px-3 py-2 bg-white dark:bg-neutral-800" id="el-n6i96rlv">
                  <input type="text" placeholder="Type a message..." className="w-full input bg-transparent border-none focus:ring-0 text-sm " id="el-yrgsqjsp"></input>
                  <button className="ml-2 p-1 rounded-full bg-indigo-500 text-white" id="el-4rkja0un">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" id="el-xl5vifj7">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" id="el-6b5y1571"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-30" id="el-wvd3e267"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-purple-200 dark:bg-purple-900 rounded-full opacity-30" id="el-f3wx6w8s"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 text-center" id="el-0nkvklke">
      <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md" id="el-o4cfu71j">
        <p className="text-indigo-600 dark:text-indigo-400 font-bold text-3xl" id="el-8arr8k8c">5M+</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm" id="el-ifgt0ukl">Active Users</p>
      </div>
      <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md" id="el-33m3vvkg">
        <p className="text-indigo-600 dark:text-indigo-400 font-bold text-3xl" id="el-piscud3k">99%</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm" id="el-imbp9hre">Satisfaction</p>
      </div>
      <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md" id="el-lzx4i9yl">
        <p className="text-indigo-600 dark:text-indigo-400 font-bold text-3xl" id="el-wk423yob">24/7</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm" id="el-0xteq8t4">Support</p>
      </div>
      <div className="bg-white dark:bg-neutral-800 p-4 rounded-lg shadow-md" id="el-dezncklf">
        <p className="text-indigo-600 dark:text-indigo-400 font-bold text-3xl" id="el-677p64hn">4.9★</p>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm" id="el-3nuw0tvj">App Store Rating</p>
      </div>
    </div>
  </section>
</div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
