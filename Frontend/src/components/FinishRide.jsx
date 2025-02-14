import React, { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Random_2 from '../assets/Random_2.jpg';

import axios from 'axios';
import { CaptainDataContext } from '../context/CaptainContext';

const FinishRide = ({ ride, setFinishRidePanel }) => {
  const navigate = useNavigate(); // ✅ Added navigate function


  const { captain } = useContext(CaptainDataContext);

  if (!ride) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading ride details...</div>;
  }

  const ride_Id = ride?._id;

  
  const endRide = async () => {
    if (!ride_Id) {
      console.error("❌ Error: rideId is undefined");
      return;
    }

    try {
      

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
        rideId: ride_Id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('captain_token')}`
        }
      });

     
      if (response.status === 200) {
        navigate('/captain-home');
      }
    } catch (error) {
      console.error("❌ Error ending ride:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      {/* ✅ Close Button */}
      <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={() => setFinishRidePanel(false)}>
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5 text-center'>Finish this Ride</h3>

      {/* ✅ User Details */}
      <div className='flex items-center justify-between p-4 border-3 border-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 rounded-full object-cover w-12' src={Random_2} alt='User' />
          <h2 className='text-lg font-medium capitalize'>{ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}</h2>
        </div>
        <h5 className='text-medium font-semibold mt-3'>{ride?.rideDistance || ride?.distance}</h5>
      </div>

      {/* ✅ Ride Information */}
      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill"></i>
            <div>
              <p className='text-sm text-gray-600'>Pickup Location</p>
              <h3 className='text-lg font-medium'>{ride?.pickup}</h3>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <p className='text-sm text-gray-600'>Destination</p>
              <h3 className='text-lg font-medium'>{ride?.destination}</h3>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <p className='text-sm text-gray-600'>Fare</p>
              <h3 className='text-lg font-medium'>${ride?.fare}</h3>
            </div>
          </div>
        </div>

        {/* ✅ Finish Ride Button */}
        <div className='mt-6 w-full'>
          <button
            onClick={endRide}
            className='w-full mt-5 flex text-lg justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>
            Finish Ride
          </button>
          <p className='mt-10 text-xs text-center'>Click the "Finish Ride" button once payment is completed.</p>
        </div>
      </div>
    </div>
  );
};

export default FinishRide;
