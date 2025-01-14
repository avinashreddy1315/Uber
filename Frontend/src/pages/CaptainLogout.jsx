import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutCaptain = async () => {
      try {
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          localStorage.removeItem('token');
          navigate('/');
        }
      } catch (error) {
        console.error('Logout failed:', error);
        localStorage.removeItem('token');  // Force logout even if API fails
        navigate('/');
      }
    };

    logoutCaptain();
  }, [navigate]);

  return (
    <div>
      Captain Logout...
    </div>
  );
};

export default CaptainLogout;
