const rideService = require('../services/ride.service')
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');



const createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    const user_id = req.Id;

    try {
        const ride = await rideService.createRide({ user: user_id, pickup, destination, vehicleType });

        const rideDistanceDurination = await mapService.getDistanceAndTime(pickup, destination);

        const pickUpCoordinates = await mapService.getAddressCoordinate(pickup);

        const captainsInRadius = await mapService.getCaptainsInTheRadius(pickUpCoordinates.ltd, pickUpCoordinates.lng, 15, vehicleType);

        // ✅ Check if captains are available
        if (captainsInRadius.length === 0) {
            return res.status(404).json({ message: "No captains are available right now. Please try again later." });
        }

        ride.otp = "";

        // ✅ Send ride request to available captains
        for (const captain of captainsInRadius) {
            const driverCoordinates = { latitude: captain.location.ltd, longitude: captain.location.lng };

            const distanceAndTime = await mapService.getCoordinatesToAddress(
                driverCoordinates.latitude,
                driverCoordinates.longitude,
                pickup
            );

         

            // ✅ Include distance/time in the ride object before sending it
            const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
            rideWithUser._doc.distance = distanceAndTime.distance;
            rideWithUser._doc.duration = distanceAndTime.duration;
            rideWithUser._doc.rideDistance = rideDistanceDurination.distance;
            rideWithUser._doc.rideDuration = rideDistanceDurination.duration;

          
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        }

        // ✅ Send success response
        return res.status(201).json({ ride,   captainsInRadius});

    } catch (error) {
        console.error(error);
        return res.status(501).json({ message: "Internal server error" });
    }
};


const getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;


    try {
        const fare = await rideService.getFare(pickup, destination);

        return res.status(201).json(fare);

    } catch (error) {
        console.error(error);
        return res.status(501).json({ message: "Internal server error" });
    }
}



const confirmRide = async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, captainId } = req.body;
   

    try{
        const ride = await rideService.confirmRide({ rideId, captainId });

        const dis = await mapService.getCoordinatesToAddress(ride.captain.location.ltd, ride.captain.location.lng, ride.pickup)
       

        ride._doc.distanceToPickup = dis.distance;
        ride._doc.durationToTime = dis.duration;

        sendMessageToSocketId(ride?.user?.socketId, {
            event: 'ride-confirmed',
            data: ride
        })

        return res.status(200).json(ride);

    }catch(error){
        console.error(error);
        return res.status(501).json({ message: "Internal server error" });
    } 

}




const startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
   

    try {
        
        const ride = await rideService.startRide({ rideId, otp });

     
            
        res.status(200).json(ride);
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })

        
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
   

    if (!rideId) {
        console.error("❌ Error: rideId is missing in request body.");
        return res.status(400).json({ message: "Ride ID is required." });
    }

    if (!req.Id) {
        console.error("❌ Error: Captain data is missing.");
        return res.status(400).json({ message: "Captain authentication failed." });
    }

    try {
        const ride = await rideService.endRide({ rideId, captain: req.Id });

        

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.error("❌ Error in endRide:", err.message);
        return res.status(500).json({ message: err.message });
    }
};




module.exports = { createRide, getFare, confirmRide, startRide, endRide}