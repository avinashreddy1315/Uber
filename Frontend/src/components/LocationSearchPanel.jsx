import React, { useEffect } from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
        // setVehiclePanel(true)
        // setPanelOpen(false)
    }

   

    return (
        <>{suggestions.length == 0 ?
            <div className='flex justify-center items-center mt-24'>
                <h4>Please Enter pickup are destination</h4>
            </div> 
            :
            <div >
                {/* Display fetched suggestions */}
                {
                    suggestions.map((elem, idx) => (
                        <div key={idx} onClick={() => handleSuggestionClick(elem.description)} className='flex gap-4 border-2 p-2 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start'>
                            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                            <h4 className="font-medium line-clamp-2 w-full">{elem.description}</h4>
                        </div>
                    ))
                }
            </div>
        }
        </>
    )
}

export default LocationSearchPanel