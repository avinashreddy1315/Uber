const captainModal = require('../models/captain.model')
const {verifyGoogleToken} = require('../services/googleAuth.service');



const googleCaptainLogin = async (req, res) =>{

    const {tokenId} = req.body;
    //console.log(`tokenId from google : ${tokenId}`)
    try{
        const payload = await verifyGoogleToken(tokenId);

        if(!payload){
            return res.status(400).json({message : "Invalid Google Token"});
        }

        const {email, given_name, family_name} = payload;

        let captain = await captainModal.findOne({email});

        if(captain){
            //If user exsits
            const token = captain.generateAuthToken();
            res.cookie('token', token);
            return res.status(200).json({message: 'Captain Loggedin Succesfull', token, captain})
        }else{
            //If user doen't exsits
            return res.status(302).json({
                message : "user not found, redirecting to registation",
                redirectUrl: '/captain-signup',
                captainDeatils: {
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







module.exports = {googleCaptainLogin}