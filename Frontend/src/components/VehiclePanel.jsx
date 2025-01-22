import React from 'react'
import Ubercar from '../../public/ubercar.webp'
import ubercar2 from '../../public/ubercar2.webp'
import ubermotorbike from '../../public/ubermotorbike.webp'
import uberauto from '../../public/uberauto.webp'
const VehiclePanel = (props) => {
  return (
    <div>
      <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={()=>{
                props.setVehiclePanel(false)
              }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
              <h3 className='text-2xl font-semibold mb-5'> Choose a Vehicle</h3>
      
              <div onClick={()=>{
                props.setConfirmRidePanel(true)
              }} className='flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-between p-3'>
                <img  className='h-10' src={ubercar2} alt=""/>
                <div className=' ml-2 w-1/2'>
                  <h4 className=' font-medium text-base'> UberGo <span> <i className="ri-user-3-fill"></i>4</span></h4>
                  <h5 className=' font-medium text-base'> 2 mins away</h5>
                  <p className=' font-normal text-xs text-gray-600' > Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'> $23.20</h2>
              </div>
      
              <div  onClick={()=>{
                props.setConfirmRidePanel(true)
              }} className='flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-between p-3'>
                <img  className='h-12' src={ubermotorbike} alt=""/>
                <div className=' ml-2 w-1/2'>
                  <h4 className=' font-medium text-base'> Moto <span> <i className="ri-user-3-fill"></i>1</span></h4>
                  <h5 className=' font-medium text-base'> 3 mins away</h5>
                  <p className=' font-normal text-xs text-gray-600' > Affordable, motorbike rides</p>
                </div>
                <h2 className='text-lg font-semibold'> $33.20</h2>
              </div>
      
              <div onClick={()=>{
                props.setConfirmRidePanel(true)
              }} className='flex border-2 active:border-black mb-2 rounded-xl w-full items-center justify-between p-3'>
                <img  className='h-12' src={uberauto} alt=""/>
                <div className=' ml-2 w-1/2'>
                  <h4 className=' font-medium text-base'> Uber Auto <span> <i className="ri-user-3-fill"></i>3</span></h4>
                  <h5 className=' font-medium text-base'> 3 mins away</h5>
                  <p className=' font-normal text-xs text-gray-600' > Affordable, Auto rides</p>
                </div>
                <h2 className='text-lg font-semibold'> $19.20</h2>
              </div>
    </div>
  )
}

export default VehiclePanel
