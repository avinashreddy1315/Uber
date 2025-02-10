const userModel = require('../models/user.model')
const {verifyGoogleToken} = require('../services/googleAuth.service');



const googleUserLogin = async (req, res) =>{

    const {tokenId} = req.body;
    //console.log(`tokenId from google : ${tokenId}`)
    try{
        const payload = await verifyGoogleToken(tokenId);

        if(!payload){
            return res.status(400).json({message : "Invalid Google Token"});
        }

        const {email, given_name, family_name} = payload;

        let user = await userModel.findOne({email});

        if(user){
            //If user exsits
            const token = user.generateAuthToken();
            res.cookie('user_token', token);
            return res.status(200).json({message: 'User Loggedin Succesfull', token, user})
        }else{
            //If user doen't exsits
            return res.status(302).json({
                message : "user not found, redirecting to registation",
                redirectUrl: '/signup',
                userDetails: {
                    email: email,
                    firstname: given_name,
                    lastname: family_name
                }
            })

        }

    }catch(error){
        console.error(error);
        return res.status(501).json({message : "Internal server Error"});
    }
}







module.exports = {googleUserLogin}