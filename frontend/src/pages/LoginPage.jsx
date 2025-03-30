import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Label} from '../components/ui/label'
import {Button} from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Eye, EyeOff, Mail, Lock, Loader} from 'lucide-react'
import toast from 'react-hot-toast'
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const {login, isLoggingIn} = useAuthStore()

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!formData.email.trim()) return toast.error('Email is required')
    if(!formData.password.trim()) return toast.error('password is required')
    login(formData)
    
  }
  
  // const toastIdRef = React.useRef(null);
  //   useEffect(() => {
  //     if (isLoggingIn) {
  //       toastIdRef.current = toast.loading("Loading");
  //     } else if (!isLoggingIn && toastIdRef.current) {
  //       toast.dismiss(toastIdRef.current);
  //     }
  // }, [isLoggingIn]);
    return (
      <div className="w-full max-w-md mx-auto h-screen flex flex-col mt-2 px-3">
        <div className="text-center mb-8">
          <div className="inline-block mb-2 px-4 py-1 rounded-full bg-base-content/20 backdrop-blur-sm border border-white/10">
            <p className="text-sm font-medium text-base-content">Welcome back</p>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">
            Sign in to WhisperWire
          </h1>
          <p className="mt-3 text-whisper-gray-light">
            Enter your credentials to access your account
          </p>
        </div>
  
        <form className="space-y-6 " onSubmit={(e)=>{handleSubmit(e)}}>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-base-content/70">
              Email
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-whisper-gray-light" />
              </div>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="pl-10 h-12 bg-white/5 border-white/10 form-input-effect rounded-lg focus:bg-white/10"
                required
              />
            </div>
          </div>
  
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-sm font-medium text-base-content/70">
                Password
              </Label>
              <a 
                href="#" 
                className="text-xs hover:text-whisper-blue/80 transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-whisper-gray-light" />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="pl-10 h-12 bg-white/5 border-white/10 form-input-effect rounded-lg focus:bg-white/10"
                required
              />
              <div 
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-whisper-gray-light hover:opacity-80 transition-opacity"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </div>
            </div>
          </div>
  
          <Button 
            type="submit" 
            className={`w-full h-12 bg-gradient-to-r from-[#0EA5E9] to-[#8B5CF6] hover:from-[#0EA5E9]/90 hover:cursor-pointer hover:to-[#8B5CF6]/90 transition-all duration-300 ease-in-out transform hover:scale-[1.02] font-medium rounded-lg`}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <Loader className='animate-spin'/>: "Sign in"}
          </Button>
  
          <div className="text-center text-sm">
            <span className="text-whisper-gray-light">Don't have an account?</span>{" "}
            <a 
              href="/signup" 
              className="text-gradient font-medium hover:opacity-80 transition-opacity"
            >
              Sign up
            </a>
          </div>
          <div className='w-full h-[2px] bg-gradient-to-r from-primary/90 via-secondary/30 to-primary/90 flex items-center justify-center'><span className='w-12 backdrop-blur-3xl flex justify-center items-center'>OR</span></div>
          <div className='flex flex-col gap-4'>
                <div className='flex items-center border-2 rounded-lg transition-all duration-1000 ease-in-out bg-clip-border bg-gradient-to-bl from-gray-200/20 from-5% to-75% hover:to-95% p-2 gap-2'>
                  <GoogleIcon className='scale-90'/>
                  <span>Google [  doesnt work :( i dont know oauth  ]</span>
                </div>
          </div>
        </form>
      </div>
    );
}

export default LoginPage
