import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const CaptainProtectedWrapper = () => {
    const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    
    if (!token) {
      navigate('/login');
    }
  }, [token]);
  return <Outlet/>
}

export default CaptainProtectedWrapper
