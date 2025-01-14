import React, { useContext, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserProtectedWrapper = () => {
  const navigate = useNavigate();
  const {user, setUser, isLoading, setIsLoading} = useContext(UserDataContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    
    if (!token) {
      navigate('/login');
    }else {
      const fetchUserProfile = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            setUser(response.data.userData);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          navigate('/login');
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserProfile();
    }
  }, [navigate, token, setUser, setIsLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default UserProtectedWrapper;
