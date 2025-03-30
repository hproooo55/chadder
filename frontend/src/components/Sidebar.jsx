import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { animate, motion } from 'motion/react'
import { Contact, SidebarClose, SidebarOpen } from 'lucide-react'
import { cn } from '../lib/utils'
import { useAuthStore } from '../store/useAuthStore'


const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore()

  const { onlineUsers } = useAuthStore()
  const [showOnlineOnly, setShowOnlineOnly] = useState(false)

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredUsers = showOnlineOnly ? users.filter((user) => {
    return onlineUsers.includes(user._id)
  }) : users

  if (isUsersLoading) return <SidebarSkeleton />
  const [isAnimate, setIsAnimate] = useState(false)
  return (
    <div className='relative z-50'>
      {/* Desktop Sidebar */}
      <motion.aside
        className="h-full hidden md:flex bg-gradient-to-br from-base-200 via-base-300 to-base-200 backdrop-blur-2xl p-3 flex-col items-center"
        onMouseOver={() => setIsAnimate(true)}
        onMouseOut={() => setIsAnimate(false)}
        animate={{ width: isAnimate ? "200px" : "65px" }}
        transition={{ ease: "easeIn" }}
      >
        <div className='flex gap-5'>
          <Contact />
          {isAnimate && (
            <>
              <h2 className='font-medium text-lg'>Contacts</h2>
            </>
          )}
        </div>
        <div className={`mt-5 ${isAnimate? "flex":"hidden" } transition-all bg-base-content/10 backdrop-blur-4xl rounded-lg py-2 duration-300 ease-in-out flex flex-col items-center gap-1 w-full top-8 overflow-hidden `}>
          <label className="cursor-pointer justify-center flex items-center gap-2 w-full">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm truncate ">
              Show online only
            </span>
          </label>
          <span className="text-xs text-zinc-500 whitespace-nowrap">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
        <div className="overflow-y-auto w-full py-3">
          {filteredUsers.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
              w-full py-1 my-2 flex justify-center items-center gap-3
              hover:bg-base-300 transition-colors rounded-xl
              ${selectedUser?._id === user._id ? "bg-base-200 ring-1 ring-base-300" : ""}
            `}
            >
              <div className="relative lg:mx-0">
                <img
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  className="size-7 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                  />
                )}
              </div>

              {/* User info - only visible on larger screens */}
              {isAnimate && (
                <div className="text-left min-w-0">
                  <div className="font-medium truncate">{user.fullName}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </div>
                </div>
              )
              }
            </button>
          ))}
          {filteredUsers.length === 0 && (
            <div className='text-center text-zinc-500 py-4'>No online users</div>
          )}
        </div>
      </motion.aside>
      {/* Mobile Sidebar Toggle Button */}
      <div className='md:hidden h-full'>
        {!isAnimate ? (
          <SidebarOpen
            className="absolute z-10 m-3"
            onClick={() => setIsAnimate(true)}
          />
        ) : null}

        {/* Mobile Sidebar */}
        <motion.aside
          className="h-full z-50 md:hidden shadow-2xl bg-base-200/30 backdrop-blur-md absolute p-5 flex flex-col items-end"
          animate={{
            translateX: isAnimate ? "0px" : "-100%",
            width: isAnimate ? "200px" : "0px",
            borderTopRightRadius: isAnimate
              ? ["100%", "50%", "0%"]
              : ["0%", "50%", "100%"],
            borderBottomRightRadius: isAnimate
              ? ["100%", "50%", "0%"]
              : ["0%", "50%", "100%"],
          }}
          transition={{ ease: [0.22, 0.68, 0.75, 1], duration: 0.5 }}
        >
          <div className='flex gap-5 items-center'>

            <Contact />
            {isAnimate && (
              <>
                <h2 className='font-medium text-lg'>Contacts</h2>
              </>
            )}
            <SidebarClose onClick={() => setIsAnimate(false)} />
          </div>

          <div className="overflow-y-auto w-full py-3">
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`
              w-full py-1 my-2 flex justify-center items-center gap-3
              hover:bg-base-300 transition-colors rounded-xl
              ${selectedUser?._id === user._id ? "bg-base-200 ring-1 ring-base-300" : ""}
            `}
              >
                <div className="relative">
                  <img
                    src={user.profilePic || "/avatar.png"}
                    alt={user.name}
                    className="size-7 object-cover rounded-full"
                  />
                  {onlineUsers.includes(user._id) && (
                    <span
                      className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                    />
                  )}
                </div>
                {isAnimate && (
                  <div className="text-left min-w-0">
                    <div className="font-medium truncate">{user.fullName}</div>
                    <div className="text-sm text-zinc-400">
                      {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </div>
                  </div>
                )
                }
              </button>
            ))}
          </div>
        </motion.aside>
      </div>
    </div>
  );
}

export default Sidebar
