/*import React, { useContext, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserProtectedWrapper = () => {
  const navigate = useNavigate();
  const {user, setUser, isLoading, setIsLoading} = useContext(UserDataContext);



  useEffect(() => {
  const token = localStorage.getItem('token');

  if (!token) {
    navigate('/login');  // Redirect if no token
  } else {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setUser(response.data.userData);
        } else {
          localStorage.removeItem('token');  // Remove invalid token
          navigate('/login');  // Redirect to login
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('token');  // Remove token if error
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
   
  }
}, [navigate, setUser, setIsLoading]);


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default UserProtectedWrapper; */


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
