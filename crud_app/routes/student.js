const express = require('express');
const { findOneAndUpdate, findByIdAndUpdate } = require('../modules/student');
const router = express.Router();
// require('../public/js/common');
// use jsonwebtoken:
const jwt = require('jsonwebtoken');

// use node-localstorage:
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const studentModel = require('../modules/student');


function checkLogin(req,res, next){
    try{
        var token = localStorage.getItem('myToken');
        jwt.verify(token,'loginToken')
        next();
    }catch(err){
        res.send(`Not logged in, please login first! <button type="button" class="btn btn-link loginbtn" onclick="window.location.href='/student/login'" > Login </button>`)
    }
    
}

// first go to login page and set the localstorage 

router.get('/login', (req,res)=> {
    let getTokenValue = localStorage.getItem('myToken');
    if(getTokenValue){
        res.redirect('/student');
    }else{
        var token = jwt.sign({ divyanshd: 'devilme96@' }, 'loginToken');
        localStorage.setItem('myToken', token);
        
        res.send('Login successfully!')
    }
})

router.get('/logout', (req, res)=>{
    localStorage.removeItem('myToken');
    res.send('Logout successfully!')
})

router.get('/', checkLogin, async(req, res)=> {
    try{
        const studentData = await studentModel.find({});
        res.render('student', {title:'Student Portal', heading:'Student Records', data:studentData, success:''})
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
            name:firstLetterCapital(req.body.name),
            email:req.body.email,
            id:req.body.std_id,
            standard:req.body.standard,
            city:firstLetterCapital(req.body.city)
        })
        const studentData = await studentModel.find({});

        res.render('student', {title:'Student Portal', heading:'Student Records', data:studentData, success:'Data inserted successfully!'})
    }catch(err){
        res.send(`Error: ${err}`);
    }
});


// filter records:
// we can make it post method and get method also:

router.get('/search', checkLogin, async(req, res)=>{

    try{
        // to get the value of query parameter use req.query , give object and to get value in body parameter use req.body, get value in req params use req.params
        console.log(req.query)
        
        var filterName = req.query.filterName;
        var filterEmail = req.query.filterEmail;
        var filterId = req.query.filterId;

        // var filterName = req.body.filterName;
        // var filterEmail = req.body.filterEmail;
        // var filterId = req.body.filterId;

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
        res.render('student', {title:'Student Portal', heading:'Student Records', data:studentFilter, success:''})

    }catch(err){
        res.send(`Error: ${err}`);
    }
})


// edit the record: show edit form

router.get('/edit/:id', checkLogin, async(req, res)=>{
    try{
        var std_id = req.params.id;
        var studentData = await studentModel.findOne({id:std_id});
        console.log(studentData);
        res.render('edit', {title:'Student Portal', heading:'Edit student record', data:studentData});
    }catch(err){
        res.send(`Error: ${err}`);
    }
})

// make the first letter capital letter of each word:

function firstLetterCapital(str){
   const strArr = str.split(" ");

   for(let i=0; i<strArr.length; i++){
    strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
   }

   let name = strArr.join(" ");
   return name;
   
}

// update the record:
router.post('/update', checkLogin, async(req, res)=> {
    try{
        var id = req.body.std_objid;
        
        const updatedData = await studentModel.findByIdAndUpdate(id, {
            name:firstLetterCapital(req.body.name),
            email:req.body.email,
            id:req.body.std_id,
            standard:req.body.standard,
            city:firstLetterCapital(req.body.city)
        })

        const studentData = await studentModel.find({});

        // res.redirect('/student');

        res.render('student', {title:'Student Portal', heading:'Student Records', data:studentData, success:'Data updated successfully!'})

    }catch(err){
        res.send(`Error: ${err}`);
    }
});

// delete the record:
 
router.get('/delete/:id', checkLogin, async(req, res)=>{
    
    try{
        var std_id = req.params.id;
        const deletedStudent = await studentModel.findOneAndDelete({id:std_id});
        // deleteOne() methdo return an object with {delteCount:1} but findOneAndDelete() method return the deleted record 

        const studentData = await studentModel.find({});

        res.render('student', {title:'Student Portal', heading:'Student Records', data:studentData, success:'Data deleted successfully!'})

        // res.redirect('/student');

    }catch(err){
        res.send(err);
    }
})

module.exports = router;