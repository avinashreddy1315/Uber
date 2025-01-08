const captainModel = require("../models/captain.model")

/* this userservice function the main purpose is just create a user in the Mongo DB database
 based on the user module schema, and also to perform some basic checks */
module.exports.createCaptain = async ({
    firstname,lastname, email, password, color, plate, capacity, vehicleType
}) =>{
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All fileds are required')
    }
    const captain = captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle :{
            color,
            plate,
            capacity,
            vehicleType
        }
    })
    return captain;
}