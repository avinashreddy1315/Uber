


import React, { useContext, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainProtectedWrapper = () => {
  const navigate = useNavigate();
  const { captain, isLoading } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!isLoading && !captain) {
      navigate('/captain-login');  // Redirect if no captain found
    }
  }, [isLoading, captain, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default CaptainProtectedWrapper;

