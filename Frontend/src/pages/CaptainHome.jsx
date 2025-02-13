import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Map from '../../public/image.png'
import Uberlogo from '../../public/Uber_logo.png'
import Random from '../../public/Random.jpg'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const CaptainHome = (props) => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const [ride, setRide] = useState(null);

  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();



  const captainToken = localStorage.getItem('captain_token');

  // ✅ Redirect if there's no captain token
  useEffect(() => {
    if (!captainToken || !captain) {
      navigate('/captain-login');
    }
  }, [captainToken, captain, navigate]);

  // ✅ Only run this effect if captain exists
  /*useEffect(() => {
    if (!captain || !captainToken) return;

    socket.emit("join", { userType: 'captain', userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {

          console.log({
            userId: captain._id,
            location: {
              ltd: position.coords.latitude, 
              lng: position.coords.longitude
            }})

          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,  // ✅ Fixed property name
              lng: position.coords.longitude
            }
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

  }, []);  */


  useEffect(() => {

    // Join the socket room
    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          /*console.log({
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          }) */
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()


    // Cleanup function: runs when component unmounts or dependencies change
    /*return () => {
        clearInterval(locationInterval);  // ✅ Clear interval
        socket.emit("leave", { userId: captain?._id });  // ✅ Inform server captain left
        console.log("Captain logged out, stopping location updates");
    }; */

    socket.on('new-ride', (data) => {
      //console.log('there is an new ride requested', data);
      setRidePopupPanel(true);
      setRide(data);

    })



  }, []); // ✅ Dependency array includes `captain` and `captainToken`








  async function confirmRide() {

    
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

        rideId: ride._id,
        captainId: captain._id,
  
  
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('captain_token')}`
        }
      }) 
      //console.log(response);
      //console.log("hi this is to conform the ride");

    }catch(error){
      console.error(error);
    }
    

    

  }


  if (!captain) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
  }

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  useGSAP(function () {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(ridePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [ridePopupPanel])


  useGSAP(function () {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(0)'
      })
    }
    else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [confirmRidePopupPanel])

  return (
    <div className='h-screen'>
      <div className='fixed p-6 top-0 flex items-center justify-between w-'>
        <img className='w-16' src={Uberlogo} alt='' />
        <Link to='/captain/logout' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>


      <div className='h-3/5'>
        <img className='h-full w-full object-cover' src={Map} />

      </div>
      <div className='h-2/5 p-6 rounded-lg'>
        <CaptainDetails />
      </div>
      <div ref={ridePopupPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <RidePopUp
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          ride={ride}
          confirmRide={confirmRide}
        />
      </div>

      <div ref={confirmRidePopupPanelRef} className='fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <ConfirmRidePopUp
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome
