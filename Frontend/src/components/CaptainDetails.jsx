import React, { useContext, useState } from 'react';
import Random from '../assets/Random.jpg';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainDetails = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [loading, setLoading] = useState(false);

  const toggleStatus = async () => {
    setLoading(true);
    try {
      const newStatus = captain.status === 'inactive' ? 'active' : 'inactive';

      const response = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/captains/update-status`,
        { newstatus: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('captain_token')}`,
          },
        }
      );

      if (response.status === 200) {
        setCaptain((prevCaptain) => ({
          ...prevCaptain,
          status: newStatus,
        }));
      }
      
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-3'>
          <img className='h-10 w-10 rounded-full object-cover' src={Random} alt="" />
          <h4 className='text-lg font-medium capitalize'>{captain.fullname.firstname + " " + captain.fullname.lastname}</h4>
        </div>

        {/* Hardcoded data */}
        <div>
          <h4 className='text-xl font-semibold'> $25.36 </h4>
          <p className='text-sm text-gray-600'>Earned </p>
        </div>
      </div>

      <div className='flex p-3 my-8 bg-gray-100 rounded-xl justify-center gap-5 items-start'>
        <div className='text-center'>
          <i className=" text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className='text-lg font-medium'> $5.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className=" text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className='text-lg font-medium'> $7.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
        <div className='text-center'>
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className='text-lg font-medium'> $3.2</h5>
          <p className='text-sm text-gray-600'>Hours Online</p>
        </div>
      </div>

      {/* Status Toggle Button */}
      <div>
        <button
          className={`w-full p-3 text-xl font-bold rounded-xl transition-all duration-300 ${
            captain.status === 'inactive' ? 'bg-green-400 hover:bg-green-500' : 'bg-red-500 hover:bg-red-600'
          }`}
          onClick={toggleStatus}
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0H4z"></path>
              </svg>
              Updating...
            </span>
          ) : (
            captain.status === 'inactive' ? 'Go Online' : 'Go Offline'
          )}
        </button>
      </div>
    </div>
  );
};

export default CaptainDetails;
