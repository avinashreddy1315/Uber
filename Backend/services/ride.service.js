const rideModel = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto')




async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapsService.getDistanceAndTime(pickup, destination);

    // Ensure distance and duration exist
    if (!distanceTime.elements.distance || !distanceTime.elements.duration) {
        throw new Error("Unable to fetch distance and duration");
    }

    // Convert meters to kilometers and seconds to minutes
    const distanceKm = distanceTime.elements.distance.value / 1000;
    const durationMin = distanceTime.elements.duration.value / 60;

    // Base Fare (Starting price)
    const baseFare = {
        auto: 2.00,  // Base price in USD
        car: 3.50,
        moto: 1.50
    };

    // Per Kilometer Rate
    const perKmRate = {
        auto: 0.50,  // USD per km
        car: 1.20,
        moto: 0.40
    };

    // Per Minute Rate (Time-based charge)
    const perMinuteRate = {
        auto: 0.10,  // USD per min
        car: 0.30,
        moto: 0.08
    };

    // Service Fee (Fixed fee added to every ride)
    const serviceFee = 1.50;

    // **Calculate Final Fare**
    const fare = {
        auto: parseFloat((baseFare.auto + (distanceKm * perKmRate.auto) + (durationMin * perMinuteRate.auto) + serviceFee).toFixed(2)),
        car: parseFloat((baseFare.car + (distanceKm * perKmRate.car) + (durationMin * perMinuteRate.car) + serviceFee).toFixed(2)),
        moto: parseFloat((baseFare.moto + (distanceKm * perKmRate.moto) + (durationMin * perMinuteRate.moto) + serviceFee).toFixed(2))
    };

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


const createRide = async ({ user, pickup, destination, vehicleType }) => {

    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    //console.log(user, pickup, destination, vehicleType);
    const fare = await getFare(pickup, destination);
    //console.log(fare);
    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare: fare[vehicleType],
        otp: generateOtp(),
        vehicleType
    })


    return ride;
}



const confirmRide = async ({rideId, captainId}) => {
    if (!rideId) {
throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({_id: rideId}, {
        status: 'accepted',
        captain: captainId
    })

    const ride = await rideModel.findOne({_id: rideId}).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}



const startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({_id: rideId}, {
        status: 'ongoing'
    })

    return ride;
}

const endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}








module.exports = { createRide, getFare, confirmRide, startRide, endRide  }