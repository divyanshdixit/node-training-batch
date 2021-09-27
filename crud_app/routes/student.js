const express = require('express');
const router = express.Router();
const studentModel = require('../modules/student');

router.get('/', async(req, res)=> {
    try{
        const studentData = await studentModel.find({});
        console.log(studentData);
        console.log('student Data ')
        res.render('student', {title:'Student Portal', heading:'Student Records', data:studentData})
    }catch(err){
        res.send(`Error: ${err}`);
    }
})

module.exports = router;