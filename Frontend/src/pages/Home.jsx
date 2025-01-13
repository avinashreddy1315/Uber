import React from 'react'
import traffiu from '../../public/traffic.webp'
import { Link } from 'react-router-dom'
import Uberlogo from '../../public/Uber_logo.png'
const Home = () => {
  return (
    <div >
      <div
        className='h-screen pt-8 flex justify-between flex-col w-full bg-cover bg-bottom'
        style={{
          backgroundImage: `url(${traffiu})`,
        }}
      >
      <img className='w-14 ml-8'  src={Uberlogo} alt="Uber Logo"/>
            <div className='bg-white pb-7  py-4 px-4'>
             <h2 className='text-3xl font-bold' > Get Started with Uber</h2>    
             <Link to='/login' className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5'> Continue </Link> 
            </div>
      </div>
      
    </div>
  )
}

export default Home
