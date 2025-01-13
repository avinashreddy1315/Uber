import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Uberlogo from '../../public/Uber_logo.png';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

    // Clear the form fields
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <div>
          <Link to="/">
            <img className="w-16 mb-10" src={Uberlogo} alt="Uber Logo" />
          </Link>

          <form onSubmit={submitHandler}>
            <h3 className="text-lg w-1/2 font-medium mb-2">What's your name</h3>
            <div className="flex gap-6 mb-6">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base"
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <h3 className="text-lg font-medium mb-6">What's your email</h3>
            <input
              required
              className="bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <h3 className="text-lg font-medium mb-6">Enter Password</h3>
            <input
              required
              className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center">
            Already have an account? <Link to="/login" className="text-blue-600">Login here</Link>
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-light">
            This site is protected by reCAPTCHA and <span className="underline">Google Privacy Policy</span> and <span className="underline">Terms of Service</span> apply.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
