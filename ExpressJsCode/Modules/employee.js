const mongoose = require('mongoose');
const validator = require('validator');
const conn = mongoose.connect('mongodb://localhost:27017/employees', {useNewUrlParser:true});

conn.then(() => console.log('Connection successful!'))
.catch((err) => console.log(err));

var employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:2,
        maxlength:20
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email invalid!');
            }
        },
        required:true,
        unique:true
    },
    hourlyRate:{
        type:Number,
        min:10,
    },
    totalHour:Number,
    total:Number,
    created_at:{
        type:Date,
        default:Date.now
    }
})

var employeeModel = new mongoose.model('employee', employeeSchema);

module.exports = employeeModel;