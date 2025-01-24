import React from 'react'
import ubercar2 from '../../public/ubercar2.webp'


const UberWaitingForDriver = (props) => {
  return (
      <div>
             <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={()=>{
                        props.setUberWaitingForDriver(false)
                      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
                      <div className='flex items-center justify-between'>
                        <img className='h-10'  src={ubercar2} alt=''/>
                        <div className='text-right'>
                          <h2 className='text-lg font-medium'> Ram </h2>
                          <h4 className='text-xl font-semibold -mt-2 -mb-1'> AP04 AN 1345</h4>
                          <p className='text-sm text-gray-600'> Toyota Prius </p>
                        </div>
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
                      
                      </div> 
                      <h1>Witing for driver</h1>
                      
            </div>
  )
}

export default UberWaitingForDriver






