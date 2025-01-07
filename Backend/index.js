const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const connectToDb = require('./db/db')

const userRoutes = require('./routes/user.routes')

/*This one we are calling an connectToDb method from the db.js and 
runing the function here */
connectToDb();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended : true}));


app.use('/users',
     userRoutes);



/*with app.use we will create an route when user hit his route it callback function 
will give response if there is no error callback function will take two paratmes 
request and response */
app.use('/', (req, res)=>{
    res.send("<h1>Welcome to Uber</h1>")
})







const PORT = process.env.PORT || 4000;

/*App.listen is an method to start the server on which port number it will take two
parameters one port and other callback funtion */
app.listen(PORT, ()=>{
    console.log(`SERVER is runing on ${PORT}`)
})



//module.exports = app;