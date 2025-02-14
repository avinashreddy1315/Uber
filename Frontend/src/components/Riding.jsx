import React, { useEffect, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Map from '../../public/image.png';
import ubercar2 from '../../public/ubercar2.webp';
import ubermotorbike from '../../public/ubermotorbike.webp';
import uberauto from '../../public/uberauto.webp';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from './LiveTracking';

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
   const { socket } = useContext(SocketContext);
   const navigate = useNavigate();


  

socket.on('ride-started', ride => {
  console.log("this is after ride started", ride);
  setWaitingForDriver(false)
  navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
})




socket.on('ride-ended', ride => {
  console.log("this is after ride ended", ride);
  navigate('/home') 
})


  useEffect(() => {
    console.log("🚀 Received ride data:", ride);
  }, [ride]);

  if (!ride) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading ride details...</div>;
  }

  // ✅ Vehicle type mapping to images
  const vehicleImages = {
    car: ubercar2,
    moto: ubermotorbike,
    auto: uberauto
  };

  const vehicleImage = vehicleImages[ride?.captain?.vehicle?.vehicleType] || ubercar2;

  return (
    <div className='h-screen'>
      {/* ✅ Home Button */}
      <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-2xl font-medium ri-home-5-line"></i>
      </Link>

      {/* ✅ Map Section */}
      <div className='h-1/2'>
        <LiveTracking/>
      </div>

      {/* ✅ Ride Details */}
      <div className='h-1/2 p-4 rounded-t-3xl'>
      
        
        <div className='flex items-center justify-between'>
          <img className='h-16 w-24 object-cover' src={vehicleImage} alt={ride?.captain?.vehicle?.vehicleType} />
          <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullname?.firstname} {ride?.captain?.fullname?.lastname}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate}</h4>
            {/*<p className='text-sm text-gray-600'>{ride?.captain?.vehicle?.color} {ride?.captain?.vehicle?.vehicleType}</p> */}
          </div>
        </div>

        {/* ✅ Ride Information */}
        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-2xl ri-map-pin-user-fill"></i>
              <div>
                <p className='text-sm text-gray-600'>Pickup Location</p>
                <h3 className='text-lg font-medium'>{ride?.pickup}</h3>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-2xl ri-map-pin-2-fill"></i>
              <div>
                <p className='text-sm text-gray-600'>Destination</p>
                <h3 className='text-lg font-medium'>{ride?.destination}</h3>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line text-2xl"></i>
              <div>
                <p className='text-sm text-gray-600 text-2xl' >Fare</p>
                <h3 className='text-lg font-medium'>${ride?.fare}</h3>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Make Payment Button */}
        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
      </div>
    </div>
  );
};

export default Riding;
