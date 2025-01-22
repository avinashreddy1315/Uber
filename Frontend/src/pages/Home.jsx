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
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';


const Home = () => {
  const [pickup , setPickup] = useState('')
  const [destination , setDestination]=useState('')
  const[panelOpen, setPanelOpen] =useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel]=useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)


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
  useGSAP(function(){
    if(vehiclePanel)
    {
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else
    {
      gsap.to(vehiclePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[vehiclePanel])


  useGSAP(function(){
    if(confirmRidePanel)
    {
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(0)'
      })
    }
    else
    {
      gsap.to(confirmRidePanelRef.current,{
        transform:'translateY(100%)'
      })
    }
  },[confirmRidePanel])
  

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
          <LocationSearchPanel   setPanelOpen = {setPanelOpen} setVehiclePanel={setVehiclePanel}/>

        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'> 
        <VehiclePanel 
        setConfirmRidePanel={setConfirmRidePanel} 
        setVehiclePanel={setVehiclePanel}/>
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'> 
        <ConfirmRide/>
      </div>
      
    </div>
  )
}

export default Home
