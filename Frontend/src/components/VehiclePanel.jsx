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
    <div>
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
            className={`border-2 ${isSelected ? 'border-black bg-gray-100' : 'border-gray-300'} mb-2 rounded-xl w-full p-3 cursor-pointer transition-all`}
          >
            {/* Only show compact view for non-selected vehicles */}
            {!isSelected && (
              <div className="flex items-center justify-between">
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
              <div className="mt-4 p-4 bg-gray-200 rounded-lg">
                <div className='flex justify-center'>
                  <img className='h-24' src={vehicle.img} alt={vehicle.name}/>
                </div>
                <div className='flex flex-row justify-between items-center'>
                  <div>
                    <h4 className="text-sm font-semibold mt-1 mb-1">{vehicle.name} 
                      <span><i className="ri-user-3-fill"></i>{vehicle.capacity}</span>
                    </h4>
                    <h4 className="text-sm font-semibold">
                      {formattedArrivalTime} <span>{vehicle.time}</span>
                    </h4>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{`$${vehicle.price}`}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default VehiclePanel;
