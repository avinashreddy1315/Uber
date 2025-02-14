const { ExpressValidator } = require("express-validator");
const captainmodal = require("../models/captain.model")
const captainservice = require("../services/captain.service")
const {validationResult} = require('express-validator')
const blacklistTokenModel = require('../models/blacklistToken.model');



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
        res.cookie('token', token);
        return res.status(200).json({message : "Captain regisrted succesfully", token, newCaptain})

    }catch(error){
        console.error(error);
        return res.status(501).json({message : "Internal server error"});

    }

}



const loginCaptain = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }
    const {email, password} = req.body
    try{
        const captain = await captainmodal.findOne({email}).select('+password');
        if(!captain){
            return res.status(401).json({message : "Invalid email are password"})
        }

        const isMatch = await captain.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message : "Invalid email are password"})
        }
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        return res.status(200).json({message : "Captain Logged In succesfully", token, captain})

    }catch(error){
        return res.status(501).json({message : "Internal server Error", error});
    }


}



const captainProfile = async (req, res) =>{
     
    try{
        const captainData = await captainmodal.findById(req.Id);
        if (!captainData) {
            return res.status(404).json({ message: "Captain not found" });
        }
        return res.status(200).json({captainData});

    }catch(error){
        console.error(error);
        return res.status(501).json({message : "Internal server error"})
    }
}

const logoutCaptain = async (req, res) =>{
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    try{
        res.clearCookie('token');
        await blacklistTokenModel.create({token});
        return res.status(200).json({message: "Logged out"});
    }catch(error){
        console.error(error);
        return res.status(501).json({message : "Internal server error"}); 
    }
}

const captainStatusUpdate = async (req, res) =>{
    try {
        const { newstatus } = req.body;
       
    
        if (!['active', 'inactive'].includes(newstatus)) {
          return res.status(400).json({ message: 'Invalid status value' });
        }
    
        const updatedCaptain = await captainmodal.findByIdAndUpdate(
            {_id : req.Id},
            { status : newstatus},
            { new: true }

        );
    
        if (!updatedCaptain) {
          return res.status(404).json({ message: 'Captain not found' });
        }
    
        res.status(200).json({ message: 'Status updated successfully', captain: updatedCaptain });
      } catch (error) {
        console.error('Error updating captain status:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}



module.exports = {registerCaptain, loginCaptain, captainProfile, logoutCaptain, captainStatusUpdate}