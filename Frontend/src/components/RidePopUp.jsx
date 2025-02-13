import React from 'react'
import ubercar2 from '../../public/ubercar2.webp'
import Random_2 from '../../public/Random_2.jpg'

const RidePopUp = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={() => {
        props.setRidePopupPanel(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
      <h3 className='text-2xl font-semibold mb-4'> A New Ride Avaliable For You! </h3>
      <div className=' flex items-center justify-between p-4 bg-yellow-400 rounded-lg mt-3'>
        <div className='flex items-center gap-3'>
          <img className='h-12 rounded-full object-cover w-12' src={Random_2} alt='' />
          <h2 className='text-lg font-medium'>{`${props.ride?.user?.fullname?.firstname} ${props.ride?.user?.fullname?.lastname}`}</h2>
        </div >
        <div>
         <h5 className='text-medium font-bold mt-3'>{props.ride?.distance}</h5>
         <h5 className='text-medium font-bold mt-1'>{props.ride?.duration}</h5>
        </div>
      </div>
      <div className='flex gap-2 justify-between flex-col items-center'>

        <div className='w-full mt-5'>
          <div className='flex items-center gap-5 p-3 border-b-2 '>
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

          <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-xl ri-time-fill"></i>
            <div>
              <p className='text-sm  text-gray-600'>Distance and Time</p>
              <h3 className='text-lg font-medium'>{props.ride?.rideDistance} / {props.ride?.rideDuration}</h3>
              
            </div>
          </div>

          <div className='flex items-center gap-5 p-3'>
            <i className="text-xl ri-currency-line"></i>
            <div>
              <p className='text-sm  text-gray-600'> Cash Payment</p>
              <h3 className='text-lg font-medium'>${props.ride?.fare}</h3>
              
            </div>
          </div>

        </div>


        <div className='flex items-center w-full justify-between gap-4'>
          <button onClick={() => {
            props.setRidePopupPanel(false)
          }} className='w-[50%] mt-1 bg-gray-300 text-black font-bold p-2 px-5 rounded-lg text-[19px]'> Ignore Ride</button>
          <button onClick={() => {
            props.confirmRide();
            props.setConfirmRidePopupPanel(true);
          }} className='w-[50%] bg-green-600 text-black font-bold p-2 px-5 rounded-lg text-[19px]'> Accept Ride</button>

        </div>
      </div>
    </div>
  )
}

export default RidePopUp
