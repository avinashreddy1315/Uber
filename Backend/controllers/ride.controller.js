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

            //console.log(`Distance & Time for Captain (${captain._id}):`, distanceAndTime);

            // ✅ Include distance/time in the ride object before sending it
            const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
            rideWithUser._doc.distance = distanceAndTime.distance;
            rideWithUser._doc.duration = distanceAndTime.duration;
            rideWithUser._doc.rideDistance = rideDistanceDurination.distance;
            rideWithUser._doc.rideDuration = rideDistanceDurination.duration;

            //console.log(rideWithUser);
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
    //console.log("this is rideId", rideId, captainId);

    try{
        const ride = await rideService.confirmRide({ rideId, captainId });
        //console.log("this is from confirmride :", ride)

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



module.exports = { createRide, getFare, confirmRide }