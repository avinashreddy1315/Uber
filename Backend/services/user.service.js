const userModel = require("../models/user.model")

/* this userservice function the main purpose is just create a user in the Mongo DB database
 based on the user module schema, and also to perform some basic checks */
module.exports.createUser = async ({
    firstname,lastname, email, password
}) =>{
    if(!firstname || !email || !password){
        throw new Error('All fileds are required')
    }
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;
}