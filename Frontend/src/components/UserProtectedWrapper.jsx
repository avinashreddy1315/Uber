

import React, { useContext, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserProtectedWrapper = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useContext(UserDataContext);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');  // Redirect if no user found
    }
  }, [isLoading, user, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default UserProtectedWrapper;
