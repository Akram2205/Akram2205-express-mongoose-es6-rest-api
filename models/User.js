const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const config= require('config');

//create schema
const userSchema =new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength:3,
        maxLength:25,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (val)=>{
                return validator.isEmail(val);
            },
            message: 'value is not valid email'
        }
    },
    isAdmin:{
        type: Boolean
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
});

userSchema.method('genAuthToken',function(){
    var token = jwt.sign({
        userId: this._id,
        adminRole: this.isAdmin
    },config.get('jwtsec'));
    return token;
})

//create model
const User= mongoose.model('users',userSchema);

module.exports = User;