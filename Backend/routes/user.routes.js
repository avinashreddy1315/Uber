const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require("../controllers/user.controller");
const verifyToken = require("../middleware/auth.middleware")

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint is used to register a new user. It accepts user details such as fullname, email, and password, and creates a new user in the database.
 *     tags:
 *       - Users
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
 *     responses:
 *       200:
 *         description: User Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Registration successful
 *                 token:
 *                   type: string
 *                   description: The authentication token for the user
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
 *                     _id:
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
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  userController.registerUser
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: login a user
 *     description: This endpoint is used to login an exsisting user. It accepts user details such as email, and password, and loggens in user.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email address of the user
 *                 example: test1@example.com
 *                 minLength: 5
 *               password:
 *                 type: string
 *                 description: The password for the user
 *                 example: "12345667"
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: User Logged In successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User Loggedin Succesfull
 *                 token:
 *                   type: string
 *                   description: The authentication token for the user
 *                 User:
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
 *                     _id:
 *                       type: string
 *                       example: 677c6488a73d604e3b357d5f
 *       401:
 *         description: If user not registred are incorrect email are password
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
router.post('/login',[
  body('email').isEmail().withMessage('Invalid Email'),
  body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long')
], userController.loginUser);

/**
 * @swagger
 * /userprofile:
 *   get:
 *     summary: Get user profile
 *     description: This endpoint retrieves the profile information of the authenticated user. A valid JWT token must be provided in the Authorization header.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user profile data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userData:
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
 *                           example: 2 unit
 *                     _id:
 *                       type: string
 *                       example: 677d44f6b07b71ed606080fa
 *                     email:
 *                       type: string
 *                       example: test2@gmail.com
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
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
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

router.get('/userprofile', verifyToken, userController.getUserProfile);


/**
 * @swagger
 * /users/logout:
 *   get:
 *     summary: Logout the user
 *     description: This endpoint allows a user to logout. The token will be added to the blacklist to prevent further use.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user logged out successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "user Logged out succesfully"
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

router.get('/logout', userController.logoutUser)

module.exports = router;
