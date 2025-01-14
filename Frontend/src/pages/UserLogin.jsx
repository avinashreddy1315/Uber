import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Uberlogo from '../../public/Uber_logo.png';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate()


  const {user, setUser} = React.useContext(UserDataContext)

  // Handle traditional email/password login
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);

    setUserData({
      email: email,
      password: password,
    });

    setEmail('');
    setPassword('');
  };

  // Handle Google Login Success
  const handleUserLogin = async (credentialResponse) => {
    const tokenId = credentialResponse.credential;  // Get the Google token
    console.log("Google Token ID:", tokenId);
  
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/google-login-user`, {
        tokenId: tokenId,
      }, {
        validateStatus: (status) => {
          return status < 500;  // Accept all responses below 500 (handle 302 manually)
        }
      });
  
      //console.log(res.data);
      setUser(res.data.user)
  
      // ✅ Handle Successful Login
      if (res.status === 200) {
        alert("Login Successful!");
        navigate('/home');
      } 
      // ✅ Handle Redirect to Signup
      else if (res.status === 302) {
        const { redirectUrl, userDetails, message } = res.data;
        alert(message);
        navigate(redirectUrl, { state: userDetails });  // Redirect to /user/register with user data
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
    <div className='p-8 min-h-screen flex flex-col justify-between overflow-auto'>
      <div>
        <Link to="/">
          <img className='w-16 mb-10' src={Uberlogo} alt="Uber Logo" />
        </Link>

        {/* Traditional Login Form */}
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
            type="password"
            placeholder='password'
          />

          <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg'>Login</button>

          <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create New Account</Link></p>
        </form>
      </div>

      {/* Google Login Button */}
      <div className="flex justify-center my-4">
        <GoogleLogin
          onSuccess={handleUserLogin}
          onError={handleLoginFailure}
        />
      </div>

      <div>
        <Link to='/captain-login' className='bg-[#10b490] flex items-center justify-center text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'>
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
