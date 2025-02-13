const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const captainSchema = new mongoose.Schema({
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
        lowercase: true,
        match : [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email'],
    },
    password:{
        type: String,
        required: [true, 'Please Enter Password'],
        select:false,
    },
    socketId:{
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, 'Color must be atleast 3 Character long']
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, 'Plate must be atleast 3 Charater long']
        },
        capacity:{
            type: Number,
            required: true,
            min: [1, 'Capacity must be atleast 1'],
        },
        vehicleType:{
            type: String,
            required: true,
            enum:['car', 'motorcycle', 'auto'],
        }
    },
    location:{
        ltd:{
            type: Number,
        },
        lng:{
            type: Number
        }
    },

    
})


captainSchema.methods.generateAuthToken = function (){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn: '24h'})
    return token;
}

captainSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password, this.password);
}

/* we should not store the password directly into the database we have to encrypt the password first, and then 
we have to store it in the database so this method convert the user password to encrypted */
captainSchema.statics.hashPassword = async function (password){
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('captain', captainSchema)


