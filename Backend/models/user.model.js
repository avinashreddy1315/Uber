const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3,'First name must be at least 3 characters long'],

        },
        lastname:{
            type: String,
            minlength:[3,'Last name must be at least 3 characters long']
        }
    },
    email:{
        type: String,
        required: [true, 'Please Enter Email '],
        unique: true,
        minlength:[5, 'Email must be atleast 5 charater long'],
    },
    password:{
        type: String,
        required: [true, 'Please Enter Password'],
        select:false,
    },
    socketId:{
        type: String,
    }
})


/* this method will generate an JWT token when user is authenticated */
userSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
    return token;
}

/* this method compare the password type it by the user in the password stored in the database. 
It will use be bcrypt to encrypt and decrypt the password. */
userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

/* we should not store the password directly into the database we have to encrypt the password first, and then 
we have to store it in the database so this method convert the user password to encrypted */
userSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}



module.exports = mongoose.model('user', userSchema);

