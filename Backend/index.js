
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectToDb = require('./db/db');
const cookieParser = require('cookie-parser');
const http = require('http'); 
const { initializeSocket } = require('./socket'); // ✅ Import socket initialization

const userRoutes = require('./routes/user.routes');
const captainRouter = require('./routes/captain.routes');
const gogleAuthRouter = require('./routes/google.auth.routes');
const mapRouter = require('./routes/maps.routes');
const rideRouter = require('./routes/ride.routes');

// Swagger dependencies
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Connect to Database
connectToDb();

const app = express();
const server = http.createServer(app); // ✅ Correctly using `http.createServer(app)`

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Swagger Configuration
const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Uber Backend API",
        version: "1.0.0",
        description: "API Documentation for Uber",
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`, // Base URL for your API
        },
      ],
    },
    apis: ["./routes/*.js"], // Path to your route files with JSDoc comments
};
  
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/users', userRoutes);
app.use('/captains', captainRouter);
app.use('/api/auth', gogleAuthRouter);
app.use('/map', mapRouter);
app.use('/rides', rideRouter);

app.use('/', (req, res) => {
    res.send("<h1>Welcome to Uber</h1>");
});

// ✅ Correctly Initialize Socket.IO
initializeSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {  // ✅ Corrected to use `server.listen` instead of `app.listen`
    console.log(`SERVER is running on ${PORT}`);
});






//module.exports = app;