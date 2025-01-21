import React, { useRef, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import Uberlogo from '../../public/Uber_logo.png'
import Map from'../../public/image.png'
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import Ubercar from '../../public/ubercar.webp'
import ubercar2 from '../../public/ubercar2.webp'
import ubermotorbike from '../../public/ubermotorbike.webp'
import uberauto from '../../public/uberauto.webp'


const Home = () => {
  const [pickup , setPickup] = useState('')
  const [destination , setDestination]=useState('')
  const[panelOpen, setPanelOpen] =useState(false)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)



  const submitHandler=(e)=>{
    e.preventDefault();
  }

  useGSAP(function(){
    if(panelOpen)
    {
      gsap.to(panelRef.current,{
        height:'70%',
        padding:24
      })
      gsap.to(panelCloseRef.current,{
        opacity:1
      })
    }
    else
    {
      gsap.to(panelRef.current,{
        height:'0%'
      })
      gsap.to(panelCloseRef.current,{
        opacity:0
      })
    }
  },[panelOpen])

  const {user} = React.useContext(UserDataContext);
  

  return (
    <div className='h-screen relative overflow-hidden'>
        <img className='w-16 absolute left-5 top-5 '  src={Uberlogo} alt="Uber Logo"/>
      
      <div className='h-screen w-screen'>
        <img  className='h-full w-full object-cover' src={Map} alt=""></img>
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={()=>{
            setPanelOpen(false)
          }}className='absolute right-6 top-6 text-2xl' >
            <i className='ri-arrow-down-wide-line'></i>

          </h5>
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
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel/>

        </div>
      </div>
      <div className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-8'> 
        <h3 className='text-2xl font-semibold mb-5'> Choose a Vehicle</h3>

        <div className='flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-between p-3'>
          <img  className='h-10' src={ubercar2} alt=""/>
          <div className=' ml-2 w-1/2'>
            <h4 className=' font-medium text-base'> UberGo <span> <i className="ri-user-3-fill"></i>4</span></h4>
            <h5 className=' font-medium text-base'> 2 mins away</h5>
            <p className=' font-normal text-xs text-gray-600' > Affordable, compact rides</p>
          </div>
          <h2 className='text-lg font-semibold'> $23.20</h2>
        </div>

        <div className='flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-between p-3'>
          <img  className='h-12' src={ubermotorbike} alt=""/>
          <div className=' ml-2 w-1/2'>
            <h4 className=' font-medium text-base'> Moto <span> <i className="ri-user-3-fill"></i>1</span></h4>
            <h5 className=' font-medium text-base'> 3 mins away</h5>
            <p className=' font-normal text-xs text-gray-600' > Affordable, motorbike rides</p>
          </div>
          <h2 className='text-lg font-semibold'> $33.20</h2>
        </div>

        <div className='flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-between p-3'>
          <img  className='h-12' src={uberauto} alt=""/>
          <div className=' ml-2 w-1/2'>
            <h4 className=' font-medium text-base'> Uber Auto <span> <i className="ri-user-3-fill"></i>3</span></h4>
            <h5 className=' font-medium text-base'> 3 mins away</h5>
            <p className=' font-normal text-xs text-gray-600' > Affordable, Auto rides</p>
          </div>
          <h2 className='text-lg font-semibold'> $19.20</h2>
        </div>
      </div>
      
    </div>
  )
}

export default Home
