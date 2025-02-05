const mapsService = require('../services/maps.service')
const {validationResult} = require('express-validator');



const getCoordinates = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    
    const { address } = req.query;
    try{
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    }catch(error){
        console.error(error);
        res.status(404).json({message : "condinates not found"});
    }

}


const getTravelTimeAndDistance = async(req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {origin, destination} = req.query;
    try{
        const distance = await mapsService.getDistanceAndTime(origin, destination);
        res.status(200).json(distance);
    }catch(error){
        console.error(error);
        res.status(404).json({message : "not able to fetch the distance"});
    }
}


const getAddressSuggestion = async(req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const { input } = req.query;

    try{
        const suggestions = await mapsService.getSuggestions(input);
        res.status(200).json(suggestions);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Internal server error"});
    }

} 



module.exports ={getCoordinates, getTravelTimeAndDistance, getAddressSuggestion}