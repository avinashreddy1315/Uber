import React from 'react'
import { Link } from 'react-router-dom'
import Uberlogo from '../../public/Uber_logo.png'
import Map from'../../public/image.png'

const CaptainRiding = (props) => {
  return (
    <div className='h-screen relative '>
   <div className='fixed p-6 top-0 flex items-center justify-between w-'>
    <img className='w-16' src={Uberlogo} alt='' />
    <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-logout-box-r-line"></i>
    </Link>
   </div>


  <div className='h-4/5'>
    <img className='h-full w-full object-cover'  src={Map}/>
  
  </div>
  <div className='h-1/5 p-6 flex items-center justify-between relative bg-yellow-400 pt-10 '>
  <h5 className='p-1 text-center w-[90%] absolute top-0' onClick={()=>{
                      
    }}><i className="text-3xl text-gray-800 ri-arrow-down-wide-line"></i></h5>
      <h4 className='text-xl font-semibold '> 4 Miles away</h4>
      <button className='bg-green-600 text-white font-semibold p-3 px-10 rounded-lg' > Complete Ride</button>
  </div>
</div>
  )
}

export default CaptainRiding
