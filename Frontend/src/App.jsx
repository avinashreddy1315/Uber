import React, { useContext } from 'react'
import {Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import Captainlogin from './pages/Captainlogin'
import { UserDataContext } from './context/UserContext'
import Home from './pages/Home'

const App = () => {
  const ans =useContext(UserDataContext)



  return (
    <div className='app overflow-x-hidden'>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/signup' element={<UserSignup/>}/>
        <Route path='/captain-login' element={<Captainlogin/>}/>
        <Route path='/captain-signup' element={<CaptainSignup/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  )
} 

export default App
