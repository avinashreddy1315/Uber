import React, { useRef, useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import Uberlogo from '../../public/Uber_logo.png'
import Map from '../../public/image.png'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import Ubercar from '../../public/ubercar.webp'
import ubercar2 from '../../public/ubercar2.webp'
import ubermotorbike from '../../public/ubermotorbike.webp'
import uberauto from '../../public/uberauto.webp'
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { ArrowUpDown } from "lucide-react"; // Swap icon

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)
  const [pdErrorMessage, setPDErrorMessage] = useState('')


  const handlePickupChange = async (e) => {
    setPDErrorMessage('');
    const value = e.target.value || "";  // Ensure value is always a string
    setPickup(value);

    if (value.length < 3) {
      setPickupSuggestions([]);  // Clear suggestions if input is less than 3 characters
      return;  // Exit function early
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestion`, {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log("API Response:", response);

      if (response.data && Array.isArray(response.data)) {
        setPickupSuggestions(response.data);
      } else {
        console.warn("Unexpected API response:", response.data);
        setPickupSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setPickupSuggestions([]);
    }
  };


  const handleDestinationChange = async (e) => {
    setPDErrorMessage('');
    const value = e.target.value || "";
    setDestination(value)
    if (value.length < 3) {
      setDestinationSuggestions([]);  // Clear suggestions if input is less than 3 characters
      return;  // Exit function early
    }
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/map/get-suggestion`, {
        params: { input: value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log("API Response:", response);
      if (response.data && Array.isArray(response.data)) {
        setDestinationSuggestions(response.data);
      } else {
        console.warn("Unexpected API response:", response.data);
        setDestinationSuggestions([]);
      }

    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setDestinationSuggestions([]);
    }
  }





  const submitHandler = (e) => {
    e.preventDefault();
  }

  useGSAP(function () {
    if (panelOpen) {

      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1
      })
    }
    else {
      gsap.to(panelRef.current, {
        height: '0%'
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0
      })
    }
  }, [panelOpen])

  const { user } = React.useContext(UserDataContext);
  useGSAP(function () {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehiclePanel])


  useGSAP(function () {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePanel])


  useGSAP(function () {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [vehicleFound])


  useGSAP(function () {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(waitingForDriverRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [waitingForDriver])


  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)

    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })


    setFare(response.data)


  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })


  }

  {/* for swapping the pickup and destination */}
  const swapLocations = () => {
    if(!pickup || !destination){
      setPDErrorMessage('Please enter your pickup and destination');
    }else{
      setPickup(destination);
      setDestination(pickup);
      setPDErrorMessage('');
    }
    
  };

  return (
    <div className='h-screen relative overflow-hidden'>
      <img className='w-16 absolute left-5 top-5 ' src={Uberlogo} alt="Uber Logo" />

      <div className='h-screen w-screen'>
        <img className='h-full w-full object-cover' src={Map} alt=""></img>
      </div>
      <div className='flex flex-col justify-end h-screen absolute top-0 w-full'>
        <div className='h-[30%] p-6 bg-white relative'>
          <h5 ref={panelCloseRef} onClick={() => {
            setPanelOpen(false)
          }} className='absolute right-6 top-6 text-2xl' >
            <i className='ri-arrow-down-wide-line'></i>

          </h5>
          <h4 className='text-2xl font-semibold'> Find a trip</h4>

          <form onSubmit={(e) => submitHandler(e)}>
            <div className="relative">
              <div className="absolute left-5 top-[50px] w-1 h-16 bg-gray-700 rounded-full"></div>

              {/* Pickup Input */}
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                value={pickup}
                onChange={handlePickupChange}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
                type="text"
                placeholder="Add a pick-up location"
              />

              {/* Swap Button */}
              <button
                type="button"
                onClick={swapLocations}
                className="absolute left-4/4 transform -translate-x-1/2 top-[50px] bg-slate-50 shadow-md p-2 rounded-full"
              >
                <ArrowUpDown size={20} />
              </button>

              {/* Destination Input */}
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={handleDestinationChange}
                className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
                type="text"
                placeholder="Enter your Destination"
              />
            </div>
            <div className='mt-3 ml-3'>
              <p className='text-red-800'>{pdErrorMessage !== null ? pdErrorMessage  : ''}</p>
            </div>
            
          </form>
        </div>
        <div ref={panelRef} className='bg-white h-0'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />

        </div>
      </div>
      <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <VehiclePanel
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel} />
      </div>

      <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmRide
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound} />
      </div>

      <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver
          setVehicleFound={setVehicleFound} />
      </div>

      <div ref={waitingForDriverRef} className='fixed w-full  z-10 bottom-0  bg-white px-3 py-6 pt-12'>
        <WaitingForDriver
          waitingForDriver={waitingForDriver} />
      </div>


    </div>
  )
}

export default Home
