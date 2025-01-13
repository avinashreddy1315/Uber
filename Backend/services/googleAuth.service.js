const {OAuth2Client} = require('google-auth-library')
const userModel = require('../models/user.model');
const dotEnv = require('dotenv');
const { response } = require('express');

dotEnv.config()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);




const verifyGoogleToken = async (tokenId) =>{
    try{
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        return payload;
    }catch(error){
        console.error(error);
        return response.status(502).json({message : "Token verification failed", error})
    }
}


module.exports = {verifyGoogleToken}