import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const UserLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext); // ✅ Update user context

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem('user_token');

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          localStorage.removeItem('user_token');
          setUser(null); // ✅ Clear user state after logout
          navigate('/login'); // ✅ Redirect to login page
        }
      } catch (error) {
        console.error('Logout failed:', error);
        localStorage.removeItem('user_token');  // Force logout even if API fails
        setUser(null); // ✅ Ensure user state is cleared
        navigate('/login'); // ✅ Redirect to login page
      }
    };

    logoutUser();
  }, [navigate, setUser]);

  return (
    <div>
      Logging out...
    </div>
  );
};

export default UserLogout;
