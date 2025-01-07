const mongoose = require('mongoose')



/* function to connect DataBase */
function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() =>
            console.log("Mongodb Connected succesfull")
        ).catch((error) => {
            console.log(error);
        })

}

module.exports = connectToDb
