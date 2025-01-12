import React from 'react'
import { Link } from 'react-router-dom'

const UserSignup = () => {
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <img className='w-16 mb-10'  src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo"/>
      
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <h3 className='text-w-1/2 font-medium mb-2'> what's your name </h3>
        <div className='flex gap-6 mb-6' >
        <input required 
        className='bg-[eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm' 
        type="text" 
        placeholder='Firstname' />


        <input required 
        className='bg-[eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm' 
        type="text" 
        placeholder='LastName' />

        </div>



        <h3 className='text-base font-medium  mb-6'> What's your email </h3>
        <input required 
        className='bg-[eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
        type="email" 
        placeholder='email@example.com' />
        <h3 className='text-base font-medium mb-6'> Enter Password</h3>
        <input required className='bg-[eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' type="password" placeholder='password' />
        <button className='bg-[#111] text-white font-semibold mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base' > Login </button> 
       </form>
       <p className='text-center'>Already have a account ? <Link to='/login'className='text-blue-600'> Login here </Link></p>
        </div>
        <div>
            <p className='text-[10px] leading-light' > By proceeding , you consent to get calls , whatsup or SMS messages , including by automated means,
              from Uber and its affiliates to the number provided.
            </p>
        </div>
    </div>
    </div>
  )
}

export default UserSignup
