const express = require('express');
const router = express.Router();
const UsergoogleAuthController = require('../controllers/userGoogleAuth.controller');
const captainGoogleAuthController = require('../controllers/captainGoogleAuth.controller')


router.post('/google-login-user',  UsergoogleAuthController.googleUserLogin)
router.post('/google-login-captain', captainGoogleAuthController.googleCaptainLogin)


module.exports = router;
