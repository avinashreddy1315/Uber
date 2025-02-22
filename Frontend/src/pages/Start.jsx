import React from 'react'
import traffiu from '../assets/traffic.webp'
import { Link } from 'react-router-dom'
import Uberlogo from '../assets/Uber_logo.png'
const Start = () => {
  return (
    <div >
      <div
        className='h-screen pt-8 flex justify-between flex-col w-full '
        style={{
          backgroundImage: `url(${traffiu})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '115% 90%'
        }}
      >
      <img className='w-14 ml-8'  src={Uberlogo} alt="Uber Logo"/>
            <div className='bg-white pb-7  py-4 px-4'>
             <h2 className='text-[30px] font-bold' > Get Started with Uber</h2>    
             <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'> Continue </Link> 
            </div>
      </div>
      
    </div>
  )
}

export default Start
