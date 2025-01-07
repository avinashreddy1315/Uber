const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')



const registerUser = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {fullname, email, password} = req.body;

    
    try{
        console.log(req.body);
        const userEmail = await userModel.findOne({email});
        if(userEmail){
            return res.status(401).json({message : 'Email is alredy Registred. Please Login'})
        }

        const hashPassword = await userModel.hashPassword(password);

        const newUser = await userService.createUser({
            firstname : fullname.firstname,
            lastname : fullname.lastname,
            email,
            password : hashPassword
        });

       
        let token =newUser.generateAuthToken();
        

        res.status(200).json({message: "User Registrion succesfully", token, newUser})


    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}






module.exports={registerUser}