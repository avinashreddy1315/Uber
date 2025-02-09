const rideService = require('../services/ride.service')
const {validationResult} = require('express-validator');


const createRide = async(req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const { pickup, destination, vehicleType} = req.body;
    const user_id = req.Id;
   
    try{
        const ride = await rideService.createRide({user : user_id, pickup, destination, vehicleType});
        return res.status(201).json(ride);
    }catch(error){
        console.error(error);
        return res.status(501).json({message : "Internal server error"});
    }
}

const getFare = async (req, res) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {pickup, destination} = req.query;
    

    try{
        const fare = await rideService.getFare(pickup, destination);
        
        return res.status(201).json(fare);

    }catch(error){
        console.error(error);
        return res.status(501).json({message : "Internal server error"});
    }
}



module.exports ={createRide, getFare}