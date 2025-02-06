const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto')




async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapsService.getDistanceAndTime(pickup, destination);
    //console.log(distanceTime)
    
    

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    // Convert meters to kilometers and duration to minutes
    //console.log(distanceTime.elements.distance.value)
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.elements.distance.value / 1000) * perKmRate.auto) + ((distanceTime.elements.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.elements.distance.value / 1000) * perKmRate.car) + ((distanceTime.elements.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.elements.distance.value / 1000) * perKmRate.moto) + ((distanceTime.elements.duration.value / 60) * perMinuteRate.moto))
    };
    //console.log(generateOtp())
    return fare;
}


const generateOtp = (length = 6) => {
    /*const buffer = crypto.randomBytes(length);
    const otp = Array.from(buffer)
        .map(byte => (byte % 10).toString()) // Map each byte to a digit (0-9)
        .join('');
    console.log(otp); */
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString();

    return otp;
};


const createRide = async({user, pickup, destination, vehicleType}) =>{

    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('All fields are required');
    }

    //console.log(user, pickup, destination, vehicleType);
    const fare = await getFare(pickup, destination);
    //console.log(fare);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[ vehicleType ],
        otp : generateOtp()
    })


    return ride;
}








module.exports = {createRide}