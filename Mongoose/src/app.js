const mongoose = require('mongoose');

// return promise
const conn = mongoose.connect("mongodb://localhost:27017/nodeMongo", {useUnifiedTopology:true, useNewUrlParser:true});

conn.then( () => {
    console.log('Connected successfully with Database')
})
.catch((err)=> {
    console.log(`Connection Error:${err}`)
})

// now we'll create schema:

const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ctype:String,
    // custom validation for hours
    hours:{
        type:Number,
        validate(value){
            if(value < 0){
                throw new Error(`Hours value can't be negative`)
            }
        }
    },
    author:String,
    active:Boolean,
    date:{
        type:Date,
        default:Date.now
    }
})

// now with the help of schema we'll create model:
// mongoose.model(collectionName, SchemaName)
const Course = new mongoose.model('course', CourseSchema);

// now we'll create and insert document to this model:

const testCourse = new Course({
    name:"Javscript",
    ctype:"FrontEnd",
    hours:70,
    author:"Divyansh Dixit",
    active:true
})

// testCourse.save(); // return promise

const Create = async () => {
    try{
        const testCourse = new Course({
            name:"Node Js",
            ctype:"BackEnd",
            hours:-1,
            author:"Divyansh Dixit",
            active:true
        })

        const result = await testCourse.save(); // wait till promise completed
        console.log(result);
    }catch(err){
        console.log(err.message);
    }
}

Create();

// Insert multiple docs list at once

const CreateMany = async () => {
    try{
        const firstList = new Course({
            name:'First',
            ctype:'first_type',
            hours:10,
            author:'Dummy',
            active:false
        })

        const secondList = new Course({
            name:'Second',
            ctype:'second_type',
            hours:20,
            author:'Second Dummy',
            active:true
        })
        const result = await Course.insertMany([firstList, secondList]);
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

// CreateMany();

const getDoc = async () => {
    try{
        const result = await Course.find({ctype:"FrontEnd"}, {name:1}).limit(1).skip(1)
        console.log(result);
    }catch(err){
        console.log(err)
    }
}

// getDoc();

// get the count of documents based on given filter

const getCount = async () => {
    try{
        const result = await Course.find({$and:[{ctype:'BackEnd'}, {hours:{$gt:20}}]}).countDocuments();
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

getCount();

// sort documents from name 

const getSortedNameData = async () => {
    // -1 for desc , 1 for asc 
    const result = await Course.find().sort({name:-1});
    console.log(result);

}
// getSortedNameData();


// update one record:

const updateRecord = async () => {
    try{
        const result = await Course.findOneAndUpdate({name:"Second"}, {$set:{author:"Dummy"}}, {new:true, useFindAndModify:false});
        console.log(result);
    }catch(err){
        console.log(err);
    }
}

// updateRecord();