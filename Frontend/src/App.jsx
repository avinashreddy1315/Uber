import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainSignup from './pages/CaptainSignup';
import Captainlogin from './pages/Captainlogin';
import { UserDataContext } from './context/UserContext';
import Home from './pages/Home';
import CaptainHome from './pages/CaptainHome';
import UserProtectedWrapper from './components/UserProtectedWrapper';
import UserLogout from './pages/UserLogout';
import CaptainProtectedWrapper from './components/CaptainProtectedWrapper';
import CaptainLogout from './pages/CaptainLogout';

const App = () => {
  const ans = useContext(UserDataContext);

  return (
    <div className='app overflow-x-hidden'>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<Captainlogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />

        {/* Protected Routes */}
        <Route element={<UserProtectedWrapper />}>
          <Route path='/home' element={<Home/>} />
          <Route path='/user/logout' element={<UserLogout/>} />
        </Route>

        {/* Captain Routes */}
        <Route element={<CaptainProtectedWrapper/>}>
          <Route path='/captain-home' element={<CaptainHome/>} />
          <Route path='/captain/logout' element={<CaptainLogout/>} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
