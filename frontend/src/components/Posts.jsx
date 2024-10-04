import React, {useState, useRef, useEffect} from 'react'
import { CiImageOn } from "react-icons/ci";
import { FaRegHeart } from "react-icons/fa";

const Posts = () => {

    const [forYou, setForYou] = useState(true)
    const [following, setFollowing] = useState(false)
    const [img, setImg] = useState(null)
    const [text, setText] = useState("")
    const [posts, setPosts] = useState(null)
    const [ff, setFf] = useState(false)
    const [me, setMe] = useState({})
    const [posting, setPosting] = useState(false)
    const [post, setPost] = useState(true)
    const [loading, setLoading] = useState(false)

    const fileInputRef = useRef(null)

    const handleIconClick = () => {
        fileInputRef.current.click(); 
      }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImg(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setPost(false)
        setLoading(true)
        try {
            const response = await fetch("https://socialmedia-ozds.onrender.com/api/posts/create", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({ text, img })
            })

            if (!response.ok) {

            } else {
            const data = await response.json()
            window.location.reload()
            }
            setLoading(false)
            setPost(true)
        } catch (error) {
            console.error(error.message)
        }
    }

    const allPosts = async () => {
        try {
            const response = await fetch("https://socialmedia-ozds.onrender.com/api/posts/all", {
                credentials: "include"
            })

            if (!response.ok) {

            } else {
                const data = await response.json()
                setPosts(data)
                console.log(data)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleLike = async (id) => {
        try {
            const response = await fetch("https://socialmedia-ozds.onrender.com/api/posts/like", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify({id})
            })

            if (!response.ok) {
                const error = await response.json()
                console.error(error)
            } else {
                const data = await response.json()
                console.log(data)
                allPosts()
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const redLike = (like, id) => {
        if (like.includes(id)) {
            return "text-red-500"
        } else {
            return "text-white"
        }
    }

    const getMe = async () => {
        try {
            const response = await fetch("https://socialmedia-ozds.onrender.com/api/auth/me", {
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

    const setUserPosts = async () => {
        const currentUrl = window.location.href
            const username = currentUrl.split("/").pop().split(":")[1]
        try {
            const response = await fetch(`https://socialmedia-ozds.onrender.com/api/posts/user/${username}`, {
                credentials: "include"
            })

            if (!response.ok) {

            } else {
                const data = await response.json()
                setPosts(data)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const getFollowing = async () => {
        try {
            const response = await fetch("https://socialmedia-ozds.onrender.com/api/posts/following", {
                credentials: "include"
            })
            if (!response.ok) {

            } else {
                const data = await response.json()
                setPosts(data)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        getMe()   
    }, [])

    useEffect(() => {
        if (window.location.href === "https://social-media-app-111.vercel.app/") {
            allPosts()
            setFf(true)
            setPosting(true)
        } else {
            setUserPosts()
            setFf(false)
            const currentUrl = window.location.href
            const username = currentUrl.split("/").pop().split(":")[1]
            if (me.username === username) {
                setPosting(true)
            } else {
                setPosting(false)
            }
       }    
    }, [me])


  return (
    <div className='min-h-[100vh] border-r-[1px] max-ml:border-r-0 mr-[172px] ml-[172px] max-ml:ml-[76px] max-ml:mr-[0px] border-gray-500'>
        
        {ff && <div className='flex justify-between mx-[150px] max-cl:mx-[80px] max-lg:mx-[50px] max-ml:mx-[120px] max-mg:mx-[50px] max-tm:mx-[30px] py-4 text-[18px]'>
        <button onClick={() => {setForYou(true); setFollowing(false); allPosts()}} className='flex flex-col items-center'>
            <p>For You</p>
            {forYou && <div className='w-[50px] h-[5px] rounded-full bg-blue-500'></div>}            
        </button>

        <button onClick={() => {setForYou(false); setFollowing(true); getFollowing()}} className='flex flex-col items-center'>
            Following
            {following && <div className='w-[50px] h-[5px] rounded-full bg-blue-500'></div>}
        </button>
        </div>}

        {posting && <form onSubmit={handleSubmit}>
            <input required value={text} onChange={(e) => setText(e.target.value)} placeholder='What is happening?!' className='focus:outline-none px-5 pt-6 pb-3 w-full bg-black border-b-[px] border-t-[1px]  border-gray-600' type='text'/>
            
            <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange} 
            accept="image/*"
            className='hidden'
            />

            <div className='flex justify-between mx-5'>
            <CiImageOn onClick={handleIconClick} className='cursor-pointer text-3xl bg-gray-700 rounded-full py-1'/>
            {post && <button className='bg-blue-500 px-3 rounded-full font-[500] text-[18px]'>Post</button>}
            {loading && <div className='flex justify-center items-center bg-gray-500 px-3 rounded-full font-[500] text-[18px]'>Loading</div>}
            </div>

            {img && <div className='flex justify-center mt-5'>
            <img src={img}/>
            </div>}

            <div className='border-b-[1px] border-gray-500 mt-3'></div>
        </form>}

        <div className='w-full border-b-[1px]'></div>

        {posts && posts.map((post, index) => (
            <div key={index} className='flex flex-col border-b-[1px] border-gray-300 py-5 px-1'>
                <a href={`/profile/:${post.user.username}`} className='w-fit pl-1 pb-2 flex items-center space-x-2'>
                    <img className='w-[30px] rounded-full' src={post.user.profileImg || "/avatar.png"}/>
                
                <div className='flex space-x-2 max-tm:flex-col max-tm:space-x-0'>
                <p className='font-[700]'>{post.user.fullName}</p>
                <p className='text-gray-500'>@{post.user.username}</p>
                </div>
                </a>

                <p className='px-1 break-words'>{post.text}</p>
                <div className='flex justify-center'>
                {post.img && <img className='w-[400px] max-mg:w-[250px]  mt-5 border-[2px] border-gray-500 rounded-xl' src={post.img}/>}
                </div>

                <div className='flex items-center space-x-1'>
                <FaRegHeart onClick={() => {handleLike(post._id)}} className={`cursor-pointer ml-1 mt-2 text-[19px] ${redLike(post.likes, me._id)}`} />
                <p className='mt-[3px]'>{post.likes.length}</p>
                </div>
            </div>
        ))}
    </div>
  )
}

export default Posts