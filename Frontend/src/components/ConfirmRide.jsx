import React from 'react'
import ubercar2 from '../../public/ubercar2.webp'

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={()=>{
                props.setConfirmRidePanel(false)
              }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
              <h3 className='text-2xl font-semibold mb-5'> Confirmed Your Ride!, Your Ride Booked </h3>
              <div className='flex gap-2 justify-between flex-col items-center'>
              <img className='h-20'  src={ubercar2} alt=''/>

              <div className='w-full mt-5'>
                <div className='flex items-center gap-5 p-3 border-b-2 '>
                   <i className=" ri-map-pin-user-fill"></i> 
                   <div>
                        <h3 className='text-lg font-medium'> 562/11-A</h3>
                        <p className='text-sm -mt-1 text-gray-600'> Narasaraopeta, Andhra Pradesh</p>
                   </div>
                </div>
                <div className='flex items-center gap-5 p-3 border-b-2'>
                <i className="text-lg ri-map-pin-2-fill"></i> 
                   <div>
                        <h3 className='text-lg font-medium'> $22.35</h3>
                        <p className='text-sm -mt-1 text-gray-600'> Cash Payment</p>
                   </div>
                </div>
                <div className='flex items-center gap-5 p-3'>
                <i className="ri-currency-line"></i> 
                   <div>
                        <h3 className='text-lg font-medium'> $22.35</h3>
                        <p className='text-sm -mt-1 text-gray-600'> Cash Payment</p>
                   </div>
                </div>

              </div>
              <button  onClick={()=>{
                props.setVehicleFound(true)
                props.setConfirmRidePanel(false)
              }} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'> Confirm Ride</button>
              </div>
              
    </div>
  )
}

export default ConfirmRide
