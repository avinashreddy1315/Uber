const { default: axios } = require("axios");

const getAddressCoordinate = async (address) =>{
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            const location = response.data.results[ 0 ].geometry.location;
            return{
                ltd: location.lat,
                lng: location.lng
            };
        }else{
            throw new Error('Unable to fetch coordinates');
        }
    }catch(error){
        console.error(error);
        throw error;
    }
}


const getDistanceAndTime = async (origin, destination) => {

    if(!origin || !destination){
        throw new Error('Origin and destination are required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&units=imperial&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if(response.data.rows[0].elements[0].status === 'ZERO_RESULTS'){
                throw new Error('No routes found');
            }
            const elements = response.data.rows[0].elements[0];

            if (elements.status === "OK") {
                return {
                    elements,
                    distance: elements.distance.text, // e.g., "10.5 km"
                    duration: elements.duration.text // e.g., "15 mins"
                };
            } else {
                throw new Error(`Unable to calculate distance: ${elements.status}`);
            }
        } else {
            throw new Error(`Error from Google API: ${response.data.status}`);
        }
    } catch (error) {
        console.error("Error fetching distance and time:", error.message);
        throw error;
    }
};


const getSuggestions = async (address) =>{
    if(!address){
        throw new Error('query is required')
    }
    
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&key=${apiKey}`;


    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions
        }else{
            throw new Error('Unable to fetch suggestions');
        }
    }catch (error) {
        console.error(error);
        throw error;
    }

}




module.exports ={getAddressCoordinate, getDistanceAndTime, getSuggestions}