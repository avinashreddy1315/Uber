import React, { useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import Uberlogo from '../../public/Uber_logo.png'
import Map from'../../public/image.png'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';



const Home = () => {
  const [pickup , setPickup] = useState('')
  const [destination , setDestination]=useState('')
  const[panelOpen, setPanelOpen] =useState(false)


  const submitHandler=(e)=>{
    e.preventDefault();
  }

  const {user} = React.useContext(UserDataContext);
  

  return (
    <div className='h-screen relative'>
        <img className='w-16 absolute left-5 top-5 '  src={Uberlogo} alt="Uber Logo"/>
      
      <div className='h-screen w-screen'>
        <img  className='h-full w-full object-cover' src={Map} alt=""></img>
      </div>
      <div className='flex flex-col justify-end h-screen absolute bottom-0 w-full'>
        <div className='h-[30%] p-5 bg-white relative'>
        <h4 className='text-2xl font-semibold'> Find a trip</h4>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
          <input 
          onClick={()=>{
            setPanelOpen(true)
          }}
          value={pickup}
          onChange={(e)=>{
            setPickup(e.target.value)
          }}
          className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' 
          type="text" 
          placeholder='Add a pick-up location' 
          />
          <input
          onClick={()=>{
            setPanelOpen(true)
          }}
           value={destination}
           onChange={(e)=>{
             setDestination(e.target.value)
           }}
          className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' 
          type="text" 
          placeholder='Enter your Destination' />
        </form>
        </div>
        <div className='bg-red-500'>

        </div>
      </div>
      
    </div>
  )
}

export default Home
