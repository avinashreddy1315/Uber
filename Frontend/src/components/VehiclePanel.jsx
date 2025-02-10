import React, { useState } from 'react';
import Ubercar from '../../public/ubercar.webp';
import ubercar2 from '../../public/ubercar2.webp';
import ubermotorbike from '../../public/ubermotorbike.webp';
import uberauto from '../../public/uberauto.webp';

const VehiclePanel = (props) => {
  // State to track selected vehicle (default: UberGo)
  const [selectedVehicle, setSelectedVehicle] = useState('car');

  // Vehicle options
  const vehicles = [
    {
      type: 'car',
      name: 'UberGo',
      img: ubercar2,
      capacity: 4,
      time: '2 mins away',
      price: props.fare.car,
    },
    {
      type: 'moto',
      name: 'Moto',
      img: ubermotorbike,
      capacity: 1,
      time: '3 mins away',
      price: props.fare.moto,
    },
    {
      type: 'auto',
      name: 'Uber Auto',
      img: uberauto,
      capacity: 3,
      time: '3 mins away',
      price: props.fare.auto,
    }
  ];

  return (
    <div className='mx-1'>
      <h5 className='p-3 text-center w-[90%] absolute top-0' onClick={() => props.setVehiclePanel(false)}>
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

      {vehicles.map((vehicle) => {
        const isSelected = selectedVehicle === vehicle.type;
        const currentTime = new Date();
        const arrivalTime = new Date(currentTime.getTime() + parseInt(vehicle.time) * 60000);
        const formattedArrivalTime = arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

        return (

          <div
            key={vehicle.type}
            onClick={() => setSelectedVehicle(vehicle.type)}
            className={`border-2  ${isSelected ? 'border-black bg-gray-100 ' : 'border-gray-300'} mb-3 rounded-xl w-full p-3 cursor-pointer transition-all duration-300 ease-in-out transform ${isSelected ? 'scale-105 shadow-lg' : 'scale-100'}`}
            style={{
              padding: "10px"
            }}

          >
            {/* Only show compact view for non-selected vehicles */}
            {!isSelected && (
              <div className="flex items-center justify-between transition-opacity duration-300 ease-in-out opacity-100">
                <img className='h-12' src={vehicle.img} alt={vehicle.name} />
                <div className='ml-2 w-1/2'>
                  <h4 className='font-medium text-base'>
                    {vehicle.name} <span><i className="ri-user-3-fill"></i>{vehicle.capacity}</span>
                  </h4>
                  <h5 className='font-medium text-base'>{vehicle.time}</h5>
                </div>
                <h2 className="text-lg font-semibold">{`$${vehicle.price}`}</h2>
              </div>
            )}

            {/* Show expanded view for selected vehicle */}
            {isSelected && (
              <div className="p-2  bg-gray-200 rounded-lg transition-all duration-300 ease-in-out transform scale-100 opacity-100">
                <div className='flex justify-center'>
                  <img className='h-20 transition-transform duration-300 ease-in-out transform scale-100' src={vehicle.img} alt={vehicle.name} />
                </div>
                <div className='flex flex-row justify-between items-center'>
                  <div>
                    <div className='flex flex-row items-center gap-2'>
                      <h4 className="text-lg font-semibold mt-1 mb-1">{vehicle.name} </h4>
                      <h2><i className="ri-user-3-fill"></i>{vehicle.capacity}</h2>
                    </div>
                    <h4 className="text-lg font-semibold">
                      {formattedArrivalTime} <span>{vehicle.time}</span>
                    </h4>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{`$${vehicle.price}`}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <div className='flex gap-4'>
        <button
          className='w-3/4 bg-black text-white font-bold text-lg p-2 rounded-md mt-2'
          onClick={() => {
            props.setVehicleType(selectedVehicle);  // ✅ Set the vehicle type
            //props.createRide(selectedVehicle);      // ✅ Pass `selectedVehicle` to `createRide`
            props.setConfirmRidePanel(true);
            props.setVehiclePanel(false);
            props.setUserRide(prevRide => ({
              ...prevRide,  // Keep existing properties
              vehicleType: selectedVehicle,
              fare: props.fare[ selectedVehicle ]
            }));
            
          }}
        >
          Choose {selectedVehicle === 'car' ? 'UberGo' : selectedVehicle === 'moto' ? 'Moto' : 'Uber Auto'}
        </button>

        <button className='w-1/4 bg-gray-300 font-bold text-lg p-2 rounded-md mt-2 text-white flex justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" id="Schedule-Send-Fill--Streamline-Sharp-Fill-Material" height={35} width={35} ><desc>{"Schedule Send Fill Streamline Icon: https://streamlinehq.com"}</desc><path fill="#000000" d="M3 20V13.875L10.55 12 3 10.075V4l16.6 7h-2.35c-1.61665 0 -3.01665 0.53335 -4.2 1.6 -1.18335 1.06665 -1.85835 2.40835 -2.025 4.025L3 20Zm14.25 2c-1.3 0 -2.41665 -0.46165 -3.35 -1.385 -0.93335 -0.92335 -1.4 -2.04 -1.4 -3.35s0.46665 -2.43165 1.4 -3.365c0.93335 -0.93335 2.05 -1.4 3.35 -1.4 1.3 0 2.41665 0.4656 3.35 1.39675 0.93335 0.931 1.4 2.0571 1.4 3.37825 0 1.30715 -0.46665 2.4215 -1.4 3.343C19.66665 21.53935 18.55 22 17.25 22Zm1.75 -2.15 0.725 -0.775 -2.05 -2.05v-3H16.65v3.484L19 19.85Z" strokeWidth={0.5} /></svg>
        </button>
      </div>
    </div>
  );
}

export default VehiclePanel;



