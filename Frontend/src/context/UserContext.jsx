import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const token = localStorage.getItem('user_token');

    if (!token) {
      setUser(null);  // No token → No user
      setIsLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.status === 200) {
          setUser(response.data.userData);
        } else {
          localStorage.removeItem('user_token');  // Remove expired token
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        localStorage.removeItem('user_token');  // Clear invalid token
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <UserDataContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserDataContext.Provider>
  );
};

export default UserContext;
