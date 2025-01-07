const userModel = require('../models/user.model')
const blacklistTokenModel = require('../models/blacklistToken.model')
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv')

dotEnv.config()


const verifyToken = async (req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }
    const isBlacklisted = await blacklistTokenModel.findOne({token});
    if(isBlacklisted){
        return res.status(401).json({message : "Unauthorized"});
    }
    try{

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.Id = decode._id;
        return next()

    }catch(error){
        console.error(error); // Avoid logging sensitive data in production
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        return res.status(401).json({ message: "Unauthorized" });
    }

}

module.exports = verifyToken;