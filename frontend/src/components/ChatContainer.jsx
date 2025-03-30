import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { useAuthStore } from '../store/useAuthStore'

const ChatContainer = () => {
  const { messages, getMessages, isMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } = useChatStore()
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null)
  useEffect(() => {
    getMessages(selectedUser._id)
    
    subscribeToMessages()
    return () => unsubscribeFromMessages()
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest'});
    }
  }, [messages]);
  

  if (isMessagesLoading) return (
    <div className='flex-1 flex flex-col overflow-auto'>
      <ChatHeader />
      {/* <MessageSkeleton /> */}
      <MessageInput />
    </div>
  )

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    
    // Convert to local time
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
  
    return new Intl.DateTimeFormat("en-US", options)
      .format(date)
      .replace(",", ""); // Remove comma for desired format
  };

  return (
    <div className='p-5 font-medium flex flex-col text-xl w-full' >
      <ChatHeader selectedUser={selectedUser} />
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div
            key={messages._id}
            ref={messageEndRef}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} alt="profile Pic" />
              </div>
            </div>
            <div className='chat-footer mb-1 mt-1'>
              <time className='text-xs opacity-50 flex'> {formatDate(message.createdAt)} </time>
            </div>
            <div className={`chat-bubble flex flex-col ${message.senderId === authUser._id ? "items-end": "items-start"}`}>
              {message.image && (
                <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2' />
              )}
              {message.text && <p>{message.text}</p>}

            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  )
}

export default ChatContainer
