const mongoose = require('mongoose');

//create schema
const studentSchema =new mongoose.Schema({
    id:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
        trim: true,
        minLength:3,
        maxLength:25,
    },
    dept:{
        type: String,
        required: true,
        trim: true,
        minLength:2,
        maxLength:2,
        uppercase:2,        
    }
});


//create model
const Student= mongoose.model('students',studentSchema);

module.exports = Student;