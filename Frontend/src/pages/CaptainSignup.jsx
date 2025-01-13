import React from 'react'
import { Link } from 'react-router-dom'
import Uberlogo from '../../public/Uber_logo.png'

const CaptainSignup = () => {
  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
        <Link to="/"><img className='w-16 mb-10'  src={Uberlogo} alt="Uber Logo"/></Link>
      
      </div>
      </div>
    </div>
  )
}

export default CaptainSignup
