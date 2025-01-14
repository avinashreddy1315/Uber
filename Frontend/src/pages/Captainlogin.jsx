import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import Uberlogo from '../../public/Uber_logo.png'
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const Captainlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [captainData, setCaptainData] = useState('')
  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    const CaptainloginData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, CaptainloginData);

      if (response.status === 200) {
        //console.log(response.data.message);
        const data = response.data;
        //console.log(data)
        localStorage.setItem('token', data.token)
        setCaptain(data.captain);
        //console.log(data.captain.email)

        navigate('/captain-home');
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage(error.response.data.message);
    }

    setEmail('')
    setPassword('')
  }


  // Handle Google Login Success
  const handleUserLogin = async (credentialResponse) => {
    const tokenId = credentialResponse.credential;  // Get the Google token
    //console.log("Google Token ID:", tokenId);
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth//google-login-captain`, {
        tokenId: tokenId,
      }, {
        validateStatus: (status) => {
          return status < 500;  // Accept all responses below 500 (handle 302 manually)
        }
      });
  
      console.log(res.data);
     
  
      // ✅ Handle Successful Login
      if (res.status === 200) {
      
        setCaptain(res.data.captain)
        alert("Login Successful!");
        localStorage.setItem('token', res.data.token)
        navigate('/captain-home');
      } 
      // ✅ Handle Redirect to Signup
      else if (res.status === 302) {
        const { redirectUrl, captainDeatils, message } = res.data;
        alert(message);
        navigate(redirectUrl, { state: captainDeatils });  // Redirect to /user/register with user data
      } 
      else {
        console.error("Unexpected response:", res);
        alert("Something went wrong. Please try again.");
      }
  
    } catch (error) {
      console.error("Google login error:", error);
    }
  };
  // Handle Google Login Failure
  const handleLoginFailure = (error) => {
    console.error("Google Sign-in Error:", error);
  };

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <Link to="/"><img className='w-16 mb-10' src={Uberlogo} alt="Uber Logo" /></Link>

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>
          <h3 className='text-lg font-medium  mb-2'> What's your email</h3>
          <input required value={email} onChange={(e) => {
            setEmail(e.target.value)
          }} className='bg-[eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="email" placeholder='email@example.com' />
          <h3 className='text-lg font-medium mb-2'> Enter Password</h3>
          <input value={password} onChange={(e) => {
            setPassword(e.target.value)
          }} required className='bg-[eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='password' />
          <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base' >Captain Login </button>
          <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'> Register as a Captain</Link></p>
        </form>

        {/* Google Login Button */}
        <div className="flex justify-center my-16">
          <GoogleLogin
          onSuccess={handleUserLogin}
          onError={handleLoginFailure}
          />
        </div>

      </div>
      <div>
        <Link to='/login' className='bg-[#d5622d] flex items-center justify-center  text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'> Signin as User </Link>


      </div>
    </div>
  )
}

export default Captainlogin
