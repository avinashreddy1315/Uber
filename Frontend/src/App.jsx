import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainSignup from './pages/CaptainSignup';
import Captainlogin from './pages/Captainlogin';
import { UserDataContext } from './context/UserContext';
import { CaptainDataContext } from './context/CaptainContext';
import Home from './pages/Home';
import CaptainHome from './pages/CaptainHome';
import UserProtectedWrapper from './components/UserProtectedWrapper';
import UserLogout from './pages/UserLogout';
import CaptainProtectedWrapper from './components/CaptainProtectedWrapper';
import CaptainLogout from './pages/CaptainLogout';
import Riding from './components/Riding';
import CaptainRiding from './pages/CaptainRiding';
import 'remixicon/fonts/remixicon.css';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const AnimatedRoute = ({ element }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition}
  >
    {element}
  </motion.div>
);

const App = () => {
  const ans = useContext(UserDataContext);
  const cap = useContext(CaptainDataContext);
  const location = useLocation();

  return (
    <div className='app overflow-x-hidden'>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path='/' element={<AnimatedRoute element={<Start />} />} />

          {/* ✅ Prevent flickering by waiting for `isLoading` to complete */}
          <Route path='/login' element={
            ans.isLoading ? null : (ans.user ? <Navigate to='/home' replace /> : <AnimatedRoute element={<UserLogin />} />)
          } />
          <Route path='/signup' element={
            ans.isLoading ? null : (ans.user ? <Navigate to='/home' replace /> : <AnimatedRoute element={<UserSignup />} />)
          } />

          <Route path='/captain-login' element={
            cap.isLoading ? null : (cap.captain ? <Navigate to='/captain-home' replace /> : <AnimatedRoute element={<Captainlogin />} />)
          } />
          <Route path='/captain-signup' element={
            cap.isLoading ? null : (cap.captain ? <Navigate to='/captain-home' replace /> : <AnimatedRoute element={<CaptainSignup />} />)
          } />

          <Route path='/riding' element={<AnimatedRoute element={<Riding />} />} />
          <Route path='/captain-riding' element={<AnimatedRoute element={<CaptainRiding />} />} />

          {/* Protected Routes */}
          <Route element={<UserProtectedWrapper />}>
            <Route path='/home' element={<AnimatedRoute element={<Home />} />} />
            <Route path='/user/logout' element={<AnimatedRoute element={<UserLogout />} />} />
          </Route>

          {/* Captain Routes */}
          <Route element={<CaptainProtectedWrapper />}>
            <Route path='/captain-home' element={<AnimatedRoute element={<CaptainHome />} />} />
            <Route path='/captain/logout' element={<AnimatedRoute element={<CaptainLogout />} />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
