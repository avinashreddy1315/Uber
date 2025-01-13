const express = require('express');
const router = express.Router();
const googleAuthController = require('../controllers/userGoogleAuth.controller');


router.post('/google-login-user', googleAuthController.googleUserLogin)


module.exports = router;
