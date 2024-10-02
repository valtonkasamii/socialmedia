import React, {useEffect, useState} from 'react'
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const Sidebar = () => {
    const [me, setMe] = useState({})

   const handleClick = async () => {
        try {
            const response = await fetch("https://social-media-app-22.vercel.app/api/auth/logout", {
                method: "POST",
                credentials: "include"
            })

            if (!response.ok) {
                const error = await response.json()
                console.error(error)
            } else {
            const data = await response.json()
            console.log(data)
            window.location = "/login"
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const getMe = async () => {
        try {
            const response = await fetch("https://social-media-app-22.vercel.app/api/auth/me", {
                credentials: "include"
            })

            if (!response.ok) {
                setMe(null)
            } else {
                const data = await response.json()
                setMe(data)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getMe()
    }, [])

  return (
    <div className='fixed border-r-[1px] border-gray-500 pr-10 max-ml:pr-0 space-y-5 text-white flex flex-col h-[100vh]'>
        <a href='/'><img className='w-[75px]' src='/twitter.png'/></a>
        
        
        <a href='/' className='ml-3 flex items-center'>
        <MdHomeFilled className=' text-5xl'/>
        <p className='max-ml:hidden ml-2 text-xl'>Home</p>
        </a>

        {/* <a href='/notifications' className='ml-3 flex items-center'>
        <IoNotifications className='ml-[1px] text-[45px]'/>
        <p className='max-ml:hidden ml-2 text-xl'>Notifications</p>
        </a> */}

        <a href={`/profile/:${me.username}`} className='ml-3 flex items-center'>
        <FaUser className='ml-[2px] text-[40px]'/>
        <p className='max-ml:hidden ml-2 text-xl'>Profile</p>
        </a>

        <div className='flex pb-10 ml-[]'>
        <button onClick={() => handleClick()} href='/' className='ml-1 flex items-center'>
        <BiLogOut className=' text-5xl'/>
        <p className='max-ml:hidden ml-2 text-xl'>Log Out</p>
        </button>
        </div>
    </div>
  )
}

export default Sidebar