import React from 'react'
import ubercar2 from '../assets/ubercar2.webp';
import ubermotorbike from '../assets/ubermotorbike.webp';
import uberauto from '../assets/ubermotorbike.webp';

const LookingForDriver = (props) => {


  const vehicleImages = {
      car: ubercar2,
      moto: ubermotorbike,
      auto: uberauto
    };

  return (
    <div>
          <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={()=>{
                    props.setVehicleFound(false)
                  }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
                  <h3 className='text-2xl font-semibold mb-5'> Looking for a Captain </h3>
                  <div className='flex gap-2 justify-between flex-col items-center'>
                  <img className='h-[95px]' src={vehicleImages[props.userRide.vehicleType]} alt={props.userRide.vehicleType} />
    
                  <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2 '>
                       <i className=" text-[20px] ri-map-pin-user-fill"></i> 
                       <div>
                            <h4 className='text-[15px] font-medium'>{props.userRide.pickup}</h4>
                            {/*<p className='text-sm -mt-1 text-gray-600'> Narasaraopeta, Andhra Pradesh</p> */}
                       </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                    <i className="text-[20px] ri-map-pin-2-fill"></i> 
                       <div>
                       <h4 className='text-[15px] font-medium'>{props.userRide.destination}</h4>
                       {/*<p className='text-sm -mt-1 text-gray-600'> Cash Payment</p> */}
                       </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                    <i className=" text-[20px] ri-currency-line"></i> 
                       <div>
                        <h3 className='text-lg font-medium'>$ {props.userRide.fare}</h3>
                        <p className='text-sm -mt-1 text-gray-600'> Cash Payment</p>
                       </div>
                    </div>
    
                  </div>
                  
                  </div>
                  
        </div>
  )
}

export default LookingForDriver
