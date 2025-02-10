import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainLogout = () => {
  const navigate = useNavigate();


  const {  setCaptain } = useContext(CaptainDataContext);

  useEffect(() => {
    const logoutCaptain = async () => {
      try {
        const token = localStorage.getItem('captain_token');
        
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          localStorage.removeItem('captain_token');
          setCaptain(null);
          navigate('/');
        }
      } catch (error) {
        console.error('Logout failed:', error);
        localStorage.removeItem('captain_token');  // Force logout even if API fails
        setCaptain(null)
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
