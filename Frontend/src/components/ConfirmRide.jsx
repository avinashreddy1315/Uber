import React from 'react'
import ubercar2 from '../../public/ubercar2.webp'

const ConfirmRide = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={()=>{
                props.setVehiclePanel(false)
              }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
              <h3 className='text-2xl font-semibold mb-5'> Confirmed Your Ride!, Your Ride Booked </h3>
              <img  src={ubercar2} alt=''/>
    </div>
  )
}

export default ConfirmRide
