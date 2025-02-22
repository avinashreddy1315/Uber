const express = require('express')
const router = express.Router()
const {body, query} = require('express-validator')
const verifyToken = require('../middleware/auth.middleware')

const rideController = require('../controllers/ride.controller')


router.post('/create', 
    [
        body('pickup').isString().isLength({min : 3}).withMessage('Invalid pickup address'),
        body('destination').isString().isLength({min : 3}).withMessage('Invalid destination address'),
        body('vehicleType').isString().isIn(['auto', 'car', 'moto' ]).withMessage('Inavlid vehicle type')
    ],
    verifyToken,
    rideController.createRide

)


router.get('/get-fare',
    [
        query('pickup').isString().isLength({min : 3}),
        query('destination').isString().isLength({min : 3}),
    ],
    verifyToken,
    rideController.getFare
)



router.post('/confirm', 
    [
        body('rideId').isMongoId().withMessage('Invalid ride id'),
        body('captainId').isMongoId().withMessage('Invalid captain id')
    ],
    verifyToken, 
    rideController.confirmRide)


router.get('/start-ride',
    [
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),],
    verifyToken,
    rideController.startRide
)

router.post('/end-ride',[
    body('rideId').isMongoId().withMessage('Invalid ride id')],
    verifyToken,
    rideController.endRide
)





module.exports = router;