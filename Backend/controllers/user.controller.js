const userModel = require('../models/user.model');
const userService = require('../services/user.service')
const {validationResult} = require('express-validator')

const blacklistTokenModel = require('../models/blacklistToken.model');



const registerUser = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {fullname, email, password} = req.body;
  
    
    try{
        
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
        
        res.cookie('token', token);
        res.status(200).json({message: "User Registrion succesfully", token, user:newUser})


    }catch(error){
        console.error(error);
        res.status(500).json({error: "Internal server error"});
    }
}



const loginUser = async (req, res, next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()});
    }

    const {email, password} = req.body;
    try{
        const user = await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({message: 'Invalid email or password'})
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(401).json({message: 'Invalid email or password'})
        }

        const token =user.generateAuthToken();
        res.cookie('token', token);
        return res.status(200).json({message: 'User Loggedin Succesfull', token, user})

    }catch(errro){
        console.error(error);
        return res.status(500).json({error : "Internal server error"})
    }
}



const getUserProfile = async (req, res) =>{
    try{
        const userData = await userModel.findById(req.Id);
        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({userData});

    }catch(error){
        console.error(error);
        return res.status(500).json({error : "Internal server error"})
    }

}



const logoutUser = async (req, res) =>{
    
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    try{
        res.clearCookie('token');
        await blacklistTokenModel.create({token});
        return res.status(200).json({message: "Logged out"});

    }catch(error){
        console.error(error);
        return res.status(501).json({message : "Internal server Error"})

    }
    

}









module.exports={registerUser, loginUser, getUserProfile, logoutUser}