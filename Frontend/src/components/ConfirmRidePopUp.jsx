import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigate
import axios from 'axios';
import Random_2 from '../../public/Random_2.jpg';

const ConfirmRidePopUP = (props) => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate(); // ✅ Define navigate

  const submitHandler = async (e) => {
    e.preventDefault(); // ✅ Prevent default form submission behavior

   

    if (!props.ride?._id) {
      console.error("❌ Error: Ride ID is missing.");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: props.ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('captain_token')}`
        }
      });

      

      if (response.status === 200) {
        navigate('/captain-riding', { state: { ride: props.ride } });
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
      }
    } catch (error) {
      console.error("❌ Error sending start-ride request:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={() => {
        props.setRidePopupPanel(false);
      }}>
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Please Confirm this ride to start</h3>
      <div className='flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
        <div className='flex items-center gap-3'>
          <img className='h-12 rounded-full object-cover w-12' src={Random_2} alt='' />
          <h2 className='text-lg font-bold'>{`${props.ride?.user?.fullname?.firstname} ${props.ride?.user?.fullname?.lastname}`}</h2>
        </div>
        <h5 className='text-medium font-bold mt-3'>{props.ride?.rideDistance}</h5>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-xl ri-map-pin-user-fill"></i>
            <div>
              <p className='text-sm text-gray-600'>Pickup</p>
              <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-xl ri-map-pin-2-fill"></i>
            <div>
              <p className='text-sm text-gray-600'>Destination</p>
              <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="text-xl ri-currency-line"></i>
            <div>
              <p className='text-sm text-gray-600'>Cash Payment</p>
              <h3 className='text-lg font-medium'>${props.ride?.fare}</h3>
            </div>
          </div>
        </div>
        <div className='mt-6 w-full'>
          <form onSubmit={submitHandler}>
            <input value={otp} onChange={(e) => setOtp(e.target.value)} className='bg-[#eee] px-12 py-4 font-mono text-lg rounded-lg w-full mt-3' type="text" placeholder='Enter OTP' />
            <button className='w-full my-4 text-lg flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'>Confirm</button>
            <button type="button" onClick={() => {
              props.setConfirmRidePopupPanel(false);
              props.setRidePopupPanel(false);
            }} className='w-full mt-1 bg-red-600 text-lg text-white font-semibold p-3 rounded-lg'>Cancel Ride</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmRidePopUP;
