const mongoose = require('mongoose');
// options:

const options = {
    autoIndex:true,
}

// connect function recives an callback with one error parameter 
// OR
// we can use then bcz connect function return promise:

mongoose.connect('mongodb://localhost:27017/student', {useNewUrlParser:true})
.then(
    () => {console.log(`Database connected successfully!`)},
    (err) => {console.log(err)}
);

// const conn = mongoose.connection;
// conn.on('connecting', ()=> {
//     console.log('Connecting...')
// })
// conn.on('connected', () => {
//     console.log(`Connected Successfully!`)
// })

// Connection event:
// Connections inherit from Node.js' EventEmitter class,

/*
connecting
connected
open
disconnecting
disconnected
close
reconnected
error
reconnectFailed
reconnectTries
*/


// Now make a schema:

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    id:{
        type:Number,
        required:true,
        unique:true,
    },
    city:String,
    standard:String,
    created_at:{
        type:Date,
        default:Date.now
    }
})

// now create model using above schema

const studentModel = mongoose.model('student', studentSchema);

// export only model:
module.exports = studentModel;