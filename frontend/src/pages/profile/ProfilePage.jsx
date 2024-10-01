import React, {useEffect, useState} from 'react'
import Posts from '../../components/Posts'
const ProfilePage = () => {

    const [profile, setProfile] = useState({})
    const [follow, setFollow] = useState(false)
    const [update, setUpdate] = useState(false)
    const [me, setMe] = useState({})


    const currentUrl = window.location.href
    const username = currentUrl.split("/").pop().split(":")[1]

    const getProfile = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/profile/${username}`, {
                credentials: "include"
            })
            if (!response.ok) {
                
            } else {
                const data = await response.json()
                setProfile(data)
                console.log(data)
            }

        } catch (error) {
            console.error(error.message)
        }
    }

    const getMe = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/auth/me", {
                credentials: "include"
            })

            if (!response.ok) {
                
            } else {
                const data = await response.json()
                if (data.username === username) {
                    setUpdate(true)
                    setFollow(false)
                } else {
                    setMe(data)
                    setUpdate(false)
                    setFollow(true)
                }
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const followUser = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/users/follow/${profile._id}`, {
                method: "POST",
                credentials: "include"
            })
            getProfile()
        } catch (error) {
            console.error(error)
        }
    }

    const ifFollowing = () => {
        if (profile.followers.includes(me._id)) {
            return "Unfollow"
        } else return "Follow"
    }

    useEffect(() => {
        getProfile()
        getMe()
    }, [])

  return (
    <div className='flex flex-col w-full text-white'>
        
        <div className='ml:border-r-[1px] border-gray-500 mr-[172px] max-ml:mr-[0px] ml-[172px] max-ml:ml-[76px] justify-center pb-10 flex items-center space-x-[40px] max-ml:space-x-[10px]'>
        <img className='mt-[40px] border-8 border-gray-700 rounded-full w-[200px] max-ml:w-[120px]' src={profile.profileImg || "/avatar.png"}/>
        
        <div className='flex pt-10 max-cl:flex-col cl:space-x-10 cl:items-center'>
        <div>
        <p className='text-3xl max-ml:text-xl font-[500]'>{profile.fullName}</p>
        <p className='text-2xl max-ml:text-xl text-gray-400'>@{profile.username}</p>
        
        <div className='flex max-mt:flex-col max-mt:py-2 mt:space-x-4'>
        <p className='text-lg text-gray-400'>{profile && profile.followers ? profile.followers.length : 0} Followers</p>
        <p className='text-lg text-gray-400'>{profile && profile.following ? profile.following.length : 0} Following</p>
        </div>
        
        </div>
        {follow && <button onClick={followUser} className='text-xl bg-gray-700 w-fit max-cl:mt-2 h-fit py-1 px-3 rounded-full'>{ifFollowing()}</button>}
        </div>
        
        </div>

    <Posts />
    </div>
  )
}

export default ProfilePage