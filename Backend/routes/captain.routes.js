const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require("../controllers/captain.controller")
/**
 * @swagger
 * /captain/register:
 *   post:
 *     summary: Register a new captain
 *     description: This endpoint is used to register a new captain. It accepts captain details such as fullname, email,password and vehicle details, and creates a new captain in the database.
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
 *              vehicle:
 *                 type: object
 *                 properties:
 *                   color:
 *                     type: string
 *                     description: The color of the vehicle
 *                     example: red
 *                     minLength: 3
 *                   plate:
 *                     type: String
 *                     description: The Licence plate of the car
 *                     example: 456 987
 *                     minLength: 3
 *                   capacity:
 *                     type: number
 *                     description: The number of passengs it can accomidate without driver
 *                     example: 3
 *                     minLength: 3
 *                   vehicletype:
 *                      type: enum
 *                      description: type of the vehicle it can be car, auto, motorcycle
 *                      example: car
 *     responses:
 *       200:
 *         description: Captain Registration successful
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
 *                 newUser:
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
 *                 type: object
 *                 properties:
 *                   color:
 *                     type: string
 *                     description: The color of the vehicle
 *                     example: red
 *                     minLength: 3
 *                   plate:
 *                     type: String
 *                     description: The Licence plate of the car
 *                     example: 456 987
 *                     minLength: 3
 *                   capacity:
 *                     type: number
 *                     description: The number of passengs it can accomidate without driver
 *                     example: 3
 *                     minLength: 3
 *                   vehicletype:
 *                      type: enum
 *                      description: type of the vehicle it can be car, auto, motorcycle
 *                      example: car
 *                   _id:
 *                       type: string
 *                       example: 677c6488a73d604e3b357d5f
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


router.post("/login", captainController.loginCaptain)



module.exports = router;