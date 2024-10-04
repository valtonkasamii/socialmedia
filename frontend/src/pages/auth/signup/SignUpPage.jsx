import React, {useState} from 'react'
const SignUpPage = () => {

    const [formData, setFormData] = useState({
		email: "",
		username: "",
		fullName: "",
		password: "",
	});

    const [err, setErr] = useState("")
    const [signUp, setSignUp] = useState(true)
    const [loading, setLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault();
    setSignUp(false)
    setLoading(true)
        try {
        const { email, username, fullName, password } = formData

        const response = await fetch("https://socialmedia-ozds.onrender.com/api/auth/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ email, username, fullName, password }),
            credentials: "include"
        })

        if (!response.ok) {
            const errorData = await response.json();
            setErr(errorData.error)
          } else {
        const data = await response.json()
        console.log(data)
            setErr("")
          
            window.location = "/"

          }
          setLoading(false)
          setSignUp(true)
        } catch (error) {
            console.error(error.message)
        }
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

  return (
    <div className='max-lg:pr-20 text-white flex max-lg:flex-col justify-center max-xl:justify-between max-lg:justify-center items-center w-full h-[100vh] space-x-20'>
        
        <img className='max-lg:ml-20 max-mg:w-[300px]' src='/twitter.png'/>
        
        <div>
        
        <div className='flex flex-col justify-center items-center space-y-7'>
        <h1 className='font-[600] text-5xl'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='max-xl:pr-10 max-lg:pr-0 flex flex-col space-y-3'>
            <input maxLength="50" required name='email' value={formData.email} onChange={handleInputChange} type='email' className='bg-black border-2 border-gray-500 rounded-[5px] px-[5px] h-[50px] w-[300px] text-[20px]' placeholder='Email'/>
            <input maxLength="13" required name='username' value={formData.username} onChange={handleInputChange} type='text' className='bg-black border-2 border-gray-500 rounded-[5px] px-[5px] h-[50px] w-[300px] text-[20px]' placeholder='Username'/>
            <input maxLength="13" required name='fullName' value={formData.fullName} onChange={handleInputChange} type='text' className='bg-black border-2 border-gray-500 rounded-[5px] px-[5px] h-[50px] w-[300px] text-[20px]' placeholder='Full Name'/>
            <input required name='password' value={formData.password} onChange={handleInputChange} type='password' className='bg-black border-2 border-gray-500 rounded-[5px] px-[5px] h-[50px] w-[300px] text-[20px]' placeholder='Password'/>
            {signUp && <button className='bg-blue-500  rounded-[5px] py-2 text-[20px] font-[500]'>Sign Up</button>}
            {loading && <div className='flex cursor-not-allowed justify-center items-center bg-gray-500 rounded-[5px] py-2 text-[20px] font-[500]'>Sign Up</div>}
        </form>
        </div>
        <p className='text-xl pt-2 text-red-500'>{err}</p>
        <a href='/login'><button className='text-[20px] bg-blue-500 px-3 py-[2px] rounded-full font-[500] mt-3'>Login</button></a>
        </div>
    
    </div>
  )
}

export default SignUpPage