const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth.middleware')
const mapController = require('../controllers/map.controller')

const {query, body} = require('express-validator');


router.get('/get-coordinates',
    query('address').isString().isLength({min: 3}),
    verifyToken,  
    mapController.getCoordinates)


router.get('/get-distance', 
    [
        query('origin').isString().isLength({min : 3}),
        query('destination').isString().isLength({min : 3}),
    ],
    verifyToken, 
    mapController.getTravelTimeAndDistance
)


router.get('/get-suggestion',
    query('input').isString().isLength({min : 3}),
    verifyToken, 
    mapController.getAddressSuggestion
)


module.exports = router;