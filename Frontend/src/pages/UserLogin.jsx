import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Uberlogo from '../../public/Uber_logo.png';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import { Vortex } from 'react-loader-spinner';


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()


  const { user, setUser } = React.useContext(UserDataContext)

  // Handle traditional email/password login
  const submitHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    setErrorMessage('')
   

    const userLoginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userLoginData);

      if (response.status === 200) {
       
        const data = response.data;
        localStorage.setItem('user_token', data.token)
        setUser(data.user);
        setLoading(false);
        navigate('/home');
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      setErrorMessage(error.response.data.message);
    }
    setLoading(false);
    setEmail('');
    setPassword('');
  };

  // Handle Google Login Success
  const handleUserLogin = async (credentialResponse) => {
    const tokenId = credentialResponse.credential;  // Get the Google token
   
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/google-login-user`, {
        tokenId: tokenId,
      }, {
        validateStatus: (status) => {
          return status < 500;  // Accept all responses below 500 (handle 302 manually)
        }
      });

    
      setUser(res.data.user)

      // ✅ Handle Successful Login
      if (res.status === 200) {
        alert("Login Successful!");
        setLoading(false);
        localStorage.setItem('user_token', res.data.token)
        navigate('/home');
      }
      // ✅ Handle Redirect to Signup
      else if (res.status === 302) {
        const { redirectUrl, userDetails, message } = res.data;
        alert(message);
        setLoading(false);
        navigate(redirectUrl, { state: userDetails });  // Redirect to /user/register with user data
      }
      else {
        console.error("Unexpected response:", res);
        setLoading(false);
        alert("Something went wrong. Please try again.");
      }

    } catch (error) {
      console.error("Google login error:", error);
      setLoading(false);
    }
  };
  // Handle Google Login Failure
  const handleLoginFailure = (error) => {
    console.error("Google Sign-in Error:", error);
  };

  return (
    <div className='p-8 min-h-screen flex flex-col justify-between overflow-aut'>
      <div>
        <Link to="/">
          <img className='w-16 mb-10' src={Uberlogo} alt="Uber Logo" />
        </Link>
        {loading ?
          <div className='flex justify-center items-center mt-24'>
            <Vortex
              visible={true}
              height="80"
              width="80"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />
          </div> :
          <div className='flex justify-evenly flex-col gap-4 md:gap-6 min-h-[80vh]'>
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

              {/* error message */}
            <div>
              {errorMessage ? <p className='pt-2 text-red-700'>{errorMessage}</p> : <p></p>}
            </div>

            </form>

            

            {/*signup link */}
            <div>
              <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create New Account</Link></p>
            </div>

            

            {/* Google Login Button */}
            <div>
              <div className='flex justify-center items-center mb-7 gap-3'>
                <div className='w-16 h-0.5 bg-black rounded-full'></div>
                <p className='font-semibold'>Other Sign-in Method</p>
                <div className='w-16 h-0.5 bg-black rounded-full'></div>
              </div>

              <div className="flex justify-center my-4 mb-7">
                <GoogleLogin
                  onSuccess={handleUserLogin}
                  onError={handleLoginFailure}
                />
              </div>
            </div>
            {/* signin as captain */}
            <div>
              <Link to='/captain-login' className='bg-[#10b490] flex items-center justify-center text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg'>
                Sign in as Captain
              </Link>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default UserLogin;
