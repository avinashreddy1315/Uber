
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = useState(null); // Store captain data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = localStorage.getItem('captain_token');

    if (!token) {
      setCaptain(null);  // No token → No captain
      setIsLoading(false);
      return;
    }

    const fetchCaptainProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setCaptain(response.data.captainData);
        } else {
          localStorage.removeItem('captain_token');  // Remove expired token
          setCaptain(null);
        }
      } catch (error) {
        console.error('Error fetching captain data:', error);
        localStorage.removeItem('captain_token');  // Clear invalid token
        setCaptain(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptainProfile();
  }, []);

  return (
    <CaptainDataContext.Provider value={{ captain, setCaptain, isLoading }}>
      {children}
    </CaptainDataContext.Provider>
  );
};

export default CaptainContext;
