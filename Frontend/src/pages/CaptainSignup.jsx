import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Driverlogo from '../../public/Driverlogo.png'
const CaptainSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({}); 


  const submitHandler = (e) => {
    e.preventDefault();
  
    const newUserData = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
    };
  
    setUserData(newUserData);
  
    console.log(newUserData);
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };
  return (
    <div>
       <div>
      <div className="px-5 py-5 h-screen flex flex-col justify-between">
        <div>
          <img
            className="w-16 mb-10"
            src={Driverlogo}
            alt="Uber Logo"
          />
          <form onSubmit={(e)=>{
            submitHandler(e)}}>
            <h3 className="text-lg w-full font-medium mb-2">What's our Captain's name</h3>
            <div className="flex gap-6 mb-6">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                  
                }}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>
            <h3 className="text-lg font-medium mb-6">What's our Captain's email</h3>
            <input
              required
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <h3 className="text-lg font-medium mb-6">Enter Password</h3>
            <input
              required
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <button
              type="submit"
              className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg"
            >
              Login
            </button>
          </form>


          
          <p className="text-center">
            Already have an account? <Link to="/captain-login" className="text-blue-600">Login here</Link>
          </p>
        </div>
        <div>
          <p className="text-[10px] leading-light">
            By proceeding, you consent to get calls, WhatsApp, or SMS messages, including by automated means,
            from Uber and its affiliates to the number provided.
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CaptainSignup
