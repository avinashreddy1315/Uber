import React from 'react'
import ubercar2 from '../../public/ubercar2.webp'
import Random_2 from '../../public/Random_2.jpg'
import { Link } from 'react-router-dom'


const ConfirmRidePopUP = (props) => {
  return (
    <div>
        <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={()=>{
                          props.setRidePopupPanel(false)
                        }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
                        <h3 className='text-2xl font-semibold mb-5'> Please Confirm this ride to start </h3>
                        <div className=' flex items-center justify-between p-3 bg-yellow-400 rounded-lg mt-4'>
                            <div className='flex items-center gap-3'>
                                <img className='h-12 rounded-full object-cover w-12' src={Random_2} alt=''/>
                                <h2 className='text-lg font-medium'> Ram </h2>
                            </div >
                            <h5 className='text-medium font-semibold mt-3'> 2.5 Miles </h5>
                        </div>
                        <div className='flex gap-2 justify-between flex-col items-center'>
          
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
                        <div className='mt-6'>
                        <form onSubmit={()=>{
                          submitHandler(e)
                        }}>
                          <input type="text" placeholder='Enter OPT'  />
                        <Link to='/captain-riding' className='w-full mt-5 flex justify-center bg-green-600 text-white font-semibold p-3 rounded-lg'> Confirm Ride</Link>
                        
                        <button  onClick={()=>{
                            props.setConfirmRidePopupPanel(false)
                            props.setRidePopupPareydghtfnel(false)
                        }} className='w-full mt-1 bg-red-600 text-white font-semibold p-3 rounded-lg'> Cancel Ride</button>
                        
                        </form>
                        </div>
                        </div>
        </div>
  )
}

export default ConfirmRidePopUP
