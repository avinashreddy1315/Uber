import React from 'react'
import ubercar2 from '../../public/ubercar2.webp';
import ubermotorbike from '../../public/ubermotorbike.webp';
import uberauto from '../../public/uberauto.webp';

const WaitingForDriver = (props) => {


  
  const vehicleType = props.ride?.captain?.vehicle?.vehicleType;

  // Map vehicle type to corresponding image
  const vehicleImages = {
    car: ubercar2,
    moto: ubermotorbike,
    auto: uberauto
  };

  // Select the image based on vehicleType (default to car if undefined)
  const vehicleImage = vehicleImages[vehicleType] || ubercar2;


  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.waitingForDriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

<div className="flex justify-center">
        <img className='h-24' src={vehicleImage} alt={vehicleType} />
      </div>

      <div className='flex items-center justify-between'>
        <div>
          <div className=' flex-row'>
            <p>Captain Name</p>
            <h2 className='text-xl font-medium font-extrabold capitalize pl-3'>{props.ride?.captain?.fullname?.firstname + " " +props.ride?.captain?.fullname?.lastname}</h2>
          </div>
          <div>
            <p>Vehicle Plate</p>
            <h4 className='text-xl font-extrabold -mt-1 -mb-1 pl-3'>{props.ride?.captain?.vehicle?.plate}</h4>
          </div>
          
        </div>
        <div>
          <h1 className='text-lg font-extrabold text-center'>OTP</h1>
          <h2 className='text-3xl font-extrabold'>  {props.ride?.otp} </h2>
        </div>
        
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill text-2xl"></i>
            <div>
              <p className='text-sm -mt-1 text-gray-600'>pickup</p>
              <h3 className='text-lg font-medium'>{props.ride?.pickup}</h3>
              
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-2xl ri-map-pin-2-fill"></i>
            <div>
            <p className='text-sm -mt-1 text-gray-600'>destination</p>
              <h3 className='text-lg font-medium'>{props.ride?.destination}</h3>
              
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line text-2xl"></i>
            <div>
            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver