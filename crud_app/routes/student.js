const express = require('express');
const router = express.Router();
const studentModel = require('../modules/student');

router.get('/', async(req, res)=> {
    try{
        const studentData = await studentModel.find({});
        res.render('student', {title:'Student Portal', heading:'Student Records', data:studentData,})
    }catch(err){
        res.send(`Error: ${err}`);
    }
})

router.post('/', async(req, res)=>{
    try{
        // var newStudentDetails = new studentModel({
        //     name:req.body.name,
        //     email:req.body.email,
        //     id:req.body.std_id,
        //     standard:req.body.standard,
        //     city:req.body.city
        // })

        // newStudentDetails.save((err, data)=>{
        //     if(err) throw err;
        //     // inside it we have to write code for fetch student data to get the updated records after submit
        // });

        // insertMany() function is faster than save().
        const result = await studentModel.insertMany({
            name:req.body.name,
            email:req.body.email,
            id:req.body.std_id,
            standard:req.body.standard,
            city:req.body.city
        })
        const studentData = await studentModel.find({});

        res.render('student', {title:'Student Portal', heading:'Student Records', data:studentData})
    }catch(err){
        res.send(`Error: ${err}`);
    }
});


// filter records:

router.post('/search', async(req, res)=>{

    try{
        var filterName = req.body.filterName;
        var filterEmail = req.body.filterEmail;
        var filterId = req.body.filterId;

        if(filterName != '' && filterEmail != '' && filterId != ''){
            // all filter fields have value:
            var filterParameter = {
                $and : [{name:filterName}, {$and:[{email:filterEmail}, {id:filterId}]}]
            }
        }else if(filterName != '' && filterEmail != '' && filterId == ''){
            var filterParameter = {
                $and : [{name:filterName}, {email:filterEmail}]
            }   
        }else if(filterName != '' && filterEmail == '' && filterId != ''){
            var filterParameter = {
                $and : [{name:filterName}, {id:filterId}]
            }   
        }else if(filterName == '' && filterEmail != '' && filterId != ''){
            var filterParameter = {
                $and : [{email:filterEmail}, {id:filterId}]
            }   
        }else if(filterName != '' || filterEmail != '' || filterId != ''){
            var filterParameter = {$or:[{email:filterEmail}, {$or:[{name:filterName}, {id:filterId}]}]}
        }else{
            var filterParameter = {};
        }

        const studentFilter = await studentModel.find(filterParameter);
        res.render('student', {title:'Student Portal', heading:'Student Records', data:studentFilter})

    }catch(err){
        res.send(`Error: ${err}`);
    }
})


// edit the record:

router.get('/edit/:id', async(req, res)=>{
    try{
        var std_id = req.params.id;
        var studentData = await studentModel.find({id:std_id});
        console.log(studentData);
        res.render('edit', {title:'Student Portal', heading:'Edit student record', data:studentData});
    }catch(err){
        res.send(`Error: ${err}`);
    }
})

// delete the record:

router.get('/delete/:id', async(req, res)=>{
    try{

        var std_id = req.params.id;
        const deletedStudent = await studentModel.findOneAndDelete({id:std_id});
        // deleteOne() methdo return an object with {delteCount:1} but findOneAndDelete() method return the deleted record 
        console.log(deletedStudent);
        res.redirect('/student');
    }catch(err){
        res.send(err);
    }
})

module.exports = router;