import React from 'react'

const LocationSearchPanel = (props) => {
    console.log(props);


    const locations=[
        "24B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
        "25B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
        "26B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
        "27B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
        "28B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
        "29B, Near Kapoor's cafe, Sheryians Coding School, Bhopal",
    ]




  return (
    <div>
        {/* This is just a sample data */}
        {
            locations.map(function(elem,idx){
                return  <div key={idx} onClick={()=>{
                    console.log("Location clicked");
                    props.setVehiclePanel(true)
                    props.setPanelOpen(true);
                }}   className='flex gap-4 border-2 p-3 border-gray-2 active:border-black rounded-xl items-center my-2 justify-start'>
                <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
                <h4 className='font-medium'> {elem}</h4>
              </div>
            })
            
        }
    </div>
  )
}

export default LocationSearchPanel
