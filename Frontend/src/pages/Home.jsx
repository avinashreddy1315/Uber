import React, { useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import Uberlogo from '../../public/Uber_logo.png'
import Map from'../../public/image.png'
const Home = () => {

  const {user} = React.useContext(UserDataContext);
  

  return (
    <div className='h-screen relative'>
        <img className='w-16 absolute left-6 top-6 '  src={Uberlogo} alt="Uber Logo"/>
      
      <div className='h-screen w-screen'>
        <img  className='h-full w-full object-cover' src={Map} alt=""></img>
      </div>
      <div className='bg-white h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-5 bg-white'>
        <h4 className='text-2xl font-semibold'> Find a trip</h4>
        <form>
          <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-5' type="text" placeholder='Add a pick-up location' />
          <input className='bg-[#eee] px-12 py-2 text-base rounded-lg w-full mt-3' type="text" placeholder='Enter your Destination' />
        </form>
        </div>
        <div className='h-[70%] bg-red-500 p-5'>

        </div>
      </div>
      
    </div>
  )
}

export default Home
