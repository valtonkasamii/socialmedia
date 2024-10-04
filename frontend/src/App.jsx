import React, {useEffect, useState} from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/home/HomePage"
import LoginPage from "./pages/auth/login/LoginPage"
import SignUpPage from "./pages/auth/signup/SignUpPage"
import Sidebar from "./components/Sidebar"
import ProfilePage from "./pages/profile/ProfilePage"

function App() {

  const [auth, setAuth] = useState(null)
  const [loading, setLoading] = useState(true)

  const getMe = async () => {
    try {
      const response = await fetch("https://socialmedia-ozds.onrender.com/api/auth/me", {
        credentials: "include"
      })
      if (!response.ok) {
        setAuth(null)
      } else {
      const data = await response.json()
        console.log(data)
        setAuth(data)
      }
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  if (loading) {
    return <div className="flex h-[100vh] justify-center items-center text-5xl text-white font-[500]">Loading...</div>
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {auth && <Sidebar />}
      <Routes>
        <Route path='/' element={auth ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path='/login' element={!auth ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/signup' element={!auth ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/profile/:username" element={auth ? <ProfilePage /> : <Navigate to="/login"/>}/>        
      </Routes>
    </div>
  )
}

export default App
