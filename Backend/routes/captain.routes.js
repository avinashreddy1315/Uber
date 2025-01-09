const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require("../controllers/captain.controller");
const verifyToken = require('../middleware/auth.middleware');
/**
 * @swagger
 * /captain/register:
 *   post:
 *     summary: Register a new captain
 *     description: This endpoint is used to register a new captain. It accepts captain details such as fullname, email, password, and vehicle details, and creates a new captain in the database.
 *     tags:
 *       - captains
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: object
 *                 properties:
 *                   firstname:
 *                     type: string
 *                     description: The first name of the user
 *                     example: John
 *                     minLength: 3
 *                   lastname:
 *                     type: string
 *                     description: The last name of the user
 *                     example: Doe
 *                     minLength: 3
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: john.doe@example.com
 *                 minLength: 5
 *               password:
 *                 type: string
 *                 description: The password for the user
 *                 example: "12345667"
 *                 minLength: 6
 *               vehicle:
 *                 type: object
 *                 properties:
 *                   color:
 *                     type: string
 *                     description: The color of the vehicle
 *                     example: red
 *                   plate:
 *                     type: string
 *                     description: The license plate of the car
 *                     example: "456 987"
 *                   capacity:
 *                     type: number
 *                     description: The number of passengers it can accommodate without the driver
 *                     example: 3
 *                   vehicletype:
 *                     type: string
 *                     enum:
 *                       - car
 *                       - auto
 *                       - motorcycle
 *                     description: Type of the vehicle
 *                     example: car
 *     responses:
 *       200:
 *         description: Captain registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Captain Registration successful
 *                 token:
 *                   type: string
 *                   description: The authentication token for the Captain
 *                 newCaptain:
 *                   type: object
 *                   properties:
 *                     fullname:
 *                       type: object
 *                       properties:
 *                         firstname:
 *                           type: string
 *                           example: Test
 *                         lastname:
 *                           type: string
 *                           example: "1 unit"
 *                     email:
 *                       type: string
 *                       example: test1@gmail.com
 *                     password:
 *                       type: string
 *                       example: $2b$10$GOB9K7Hzlbbo/fQHsFfBFuTQ2w1NJ5Kr.f./k3NDlLDUvdqNRfp0W
 *                     vehicle:
 *                       type: object
 *                       properties:
 *                         color:
 *                           type: string
 *                           example: red
 *                         plate:
 *                           type: string
 *                           example: "456 987"
 *                         capacity:
 *                           type: number
 *                           example: 3
 *                         vehicletype:
 *                           type: string
 *                           enum:
 *                             - car
 *                             - auto
 *                             - motorcycle
 *                           example: car
 *                         _id:
 *                           type: string
 *                           example: 677c6488a73d604e3b357d5f
 *                         status:
 *                            type: string
 *                            enum:
 *                              - active
 *                              - inactive
 *                            example: inactive
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: First name must be at least 3 characters long
 *                       param:
 *                         type: string
 *                         example: fullname.firstname
 *                       location:
 *                         type: string
 *                         example: body
 *       401:
 *         description: Email already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email is already registered. Please log in.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.post("/register",[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min : 3}).withMessage('Color must be at least 3 characters long'),
    body('vehicle.plate').isLength({min : 3}).withMessage('Plate must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min : 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('Invalid vehicle type'),
  ],captainController.registerCaptain)

/**
 * @swagger
 * /captains/login:
 *   post:
 *     summary: Login an existing captain
 *     description: This endpoint is used to log in an existing captain. It accepts captain details such as email and password and logs in the captain.
 *     tags:
 *       - captains
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the captain
 *                 example: captain1@gmail.com
 *                 minLength: 5
 *               password:
 *                 type: string
 *                 description: The password for the captain
 *                 example: "12345667"
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Captain successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Captain Logged In successfully
 *                 token:
 *                   type: string
 *                   description: The authentication token for the captain
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzdkOWFiZmNiYWE4ODg2MDAwYmMyMDkiLCJpYXQiOjE3MzYzNjg3MjIsImV4cCI6MTczNjQ1NTEyMn0.QdoeLdHA5Nqos0hliNma5XSF9ByLkU94CNyeAwDr0m8"
 *                 captain:
 *                   type: object
 *                   properties:
 *                     fullname:
 *                       type: object
 *                       properties:
 *                         firstname:
 *                           type: string
 *                           example: captain1
 *                         lastname:
 *                           type: string
 *                           example: test
 *                     vehicle:
 *                       type: object
 *                       properties:
 *                         color:
 *                           type: string
 *                           example: red
 *                         plate:
 *                           type: string
 *                           example: "456789"
 *                         capacity:
 *                           type: number
 *                           example: 3
 *                         vehicleType:
 *                           type: string
 *                           enum:
 *                             - car
 *                             - auto
 *                             - motorcycle
 *                           example: car
 *                     _id:
 *                       type: string
 *                       example: "677d9abfcbaa8886000bc209"
 *                     email:
 *                       type: string
 *                       example: captain1@gmail.com
 *                     password:
 *                       type: string
 *                       example: "$2b$10$.3ht2qHDbFmjJxXg8rfgTuwyo.Omd1eEaVU495lHIvHn4FIPicbKG"
 *                     status:
 *                       type: string
 *                       enum:
 *                         - active
 *                         - inactive
 *                       example: inactive
 *                     __v:
 *                       type: number
 *                       example: 0
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.post("/login", captainController.loginCaptain)


/**
 * @swagger
 * /captain/profile:
 *   get:
 *     summary: Get captain profile
 *     description: This endpoint retrieves the profile information of the authenticated captain. A valid JWT token must be provided in the Authorization header.
 *     tags:
 *       - captains
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved captain profile data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 captainData:
 *                   type: object
 *                   properties:
 *                     fullname:
 *                       type: object
 *                       properties:
 *                         firstname:
 *                           type: string
 *                           example: Captain
 *                         lastname:
 *                           type: string
 *                           example: Smith
 *                     _id:
 *                       type: string
 *                       example: 677d44f6b07b71ed606080fb
 *                     email:
 *                       type: string
 *                       example: captain@example.com
 *                     vehicle:
 *                       type: object
 *                       properties:
 *                         color:
 *                           type: string
 *                           example: red
 *                         plate:
 *                           type: string
 *                           example: "456789"
 *                         capacity:
 *                           type: number
 *                           example: 3
 *                         vehicleType:
 *                           type: string
 *                           enum:
 *                             - car
 *                             - auto
 *                             - motorcycle
 *                           example: car
 *                     status:
 *                       type: string
 *                       enum:
 *                         - active
 *                         - inactive
 *                       example: active
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       401:
 *         description: Unauthorized. The token is missing, invalid, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Unauthorized
 *       404:
 *         description: Captain not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Captain not found
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

router.get("/profile", verifyToken, captainController.captainProfile)


/**
 * @swagger
 * /captains/logout:
 *   get:
 *     summary: Logout the captain
 *     description: This endpoint allows a captain to logout. The token will be added to the blacklist to prevent further use.
 *     tags:
 *       - captains
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The captain logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "captain Logged out succesfully"
 *       401:
 *         description: Unauthorized - Occurs if the token is invalid, not provided, or expired.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Internal server error - Occurs when the server encounters an unexpected error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get("/logout", captainController.logoutCaptain)



module.exports = router;