/*import React, { useEffect, useContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectedWrapper = () => {
  const navigate = useNavigate();
  const { captain, setCaptain, isLoading, setIsLoading } = useContext(CaptainDataContext);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
    } else {
      const fetchCaptainProfile = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          if (response.status === 200) {
            setCaptain(response.data.captainData);
          }
        } catch (error) {
          console.error('Error fetching captain data:', error);
          navigate('/captain-login');
        } finally {
          setIsLoading(false);
        }
      };

      fetchCaptainProfile();
    }
  }, [navigate, token, setCaptain, setIsLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <Outlet />;
};

export default CaptainProtectedWrapper; */


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

