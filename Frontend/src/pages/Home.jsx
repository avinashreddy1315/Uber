import React, { useState } from 'react'
import { UserDataContext } from '../context/UserContext'
import Uberlogo from '../../public/Uber_logo.png'

const Home = () => {

  const {user} = React.useContext(UserDataContext);
  

  return (
    <div>
      <div >
        <img className='w-16 absolute left-6 top-6 '  src={Uberlogo} alt="Uber Logo"/>
      </div>
      <div>
        
      </div>
      
      
    </div>
  )
}

export default Home
