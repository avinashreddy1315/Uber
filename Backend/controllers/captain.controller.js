const { ExpressValidator } = require("express-validator");
const captainmodal = require("../models/captain.model")
const captainservice = require("../services/captain.service")
const {validationResult} = require('express-validator')



const registerCaptain = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {fullname, email, password, vehicle} = req.body

    try{

        const captainEmail = await captainmodal.findOne({email});
        if(captainEmail){
            return res.status(401).json({message : 'Email is alredy Registred. Please Login'})
        }

        const hashPassword = await captainmodal.hashPassword(password);

        const newCaptain = await captainservice.createCaptain({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password : hashPassword,
            color : vehicle.color,
            plate : vehicle.plate,
            capacity : vehicle.capacity,
            vehicleType : vehicle.vehicleType,
        });

        const token = newCaptain.generateAuthToken();
        return res.status(200).json({message : "Captain regisrted succesfully", token, newCaptain})

    }catch(error){
        console.error(error);
        return res.status(501).json({message : "Internal server error"});

    }

}



const loginCaptain = (req, res, next) =>{

}



module.exports = {registerCaptain, loginCaptain}