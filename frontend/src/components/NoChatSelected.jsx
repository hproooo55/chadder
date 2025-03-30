import React from 'react'
import {MessageSquare} from 'lucide-react'

const NoChatSelected = () => {
  return (
    <div className='w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50 '>
     <div className='max-w-md text-center space-y-6'>
      <div className='flex justify-center gap-4 mb-3'>
        <div className='w-16 h-16 flex justify-center items-center bg-primary/10 rounded-2xl transition-all animate-bounce hover:animate-none relative hover:-translate-y-3'>
        <MessageSquare/>
        </div>
      </div>
        <div  className='flex flex-col gap-3'>
            <h2 className='font-bold text-xl'>Welcome to chatify!</h2>
            <p>Select a Conversation in the sidebar to start chatting </p>
        </div>
     </div>
    </div>
  )
}

export default NoChatSelected
