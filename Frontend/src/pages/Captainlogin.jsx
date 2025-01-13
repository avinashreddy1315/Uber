import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Driverlogo from '../../public/Driverlogo.png'
import Uberlogo from '../../public/Uber_logo.png'

const Captainlogin = () => {
    const[email,setEmail] = useState('')
    const[password,setPassword]=useState('')
    const [captainData, setCaptainData]=useState('')



    const submitHandler =(e) =>{
    e.preventDefault();
    setCaptainData({
        email:email,
        password:password
    })
    setEmail('')
    setPassword('')
    }
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
            <Link to="/"><img className='w-16 mb-10'  src={Uberlogo} alt="Uber Logo"/></Link>
          
          <form onSubmit={(e)=>{
            submitHandler(e)
          }}>
            <h3 className='text-lg font-medium  mb-2'> What's your email</h3>
            <input required value = {email} onChange={(e)=>{
             setEmail(e.target.value)
            }} className='bg-[eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' />
            <h3 className='text-lg font-medium mb-2'> Enter Password</h3>
            <input value = {password} onChange={(e)=>{
             setPassword(e.target.value)
            }} required className='bg-[eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='password' />
            <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base' > Login </button>
           <p className='text-center'>Join a fleet? <Link to='/captain-signup'className='text-blue-600'> Register as a Captain</Link></p> 
           </form>
    
            </div>
            <div>
                <Link  to='/login' className='bg-[#d5622d] flex items-center justify-center  text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'> Signin as User </Link>
    
    
            </div>
        </div>
      )
}

export default Captainlogin
