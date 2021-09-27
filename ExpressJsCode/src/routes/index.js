var express = require('express');
const { get } = require('http');
const path = require('path');
const empModel = require('../../Modules/employee');
var app = express();
const port = 3000;

app.set('view engine', 'ejs');
const viewPath = path.join(__dirname, '../../templates/views');
app.set('views', viewPath);
app.use(express.static('.././public'));

// 
const getEmployees = async () => {
    try{
        const employees = await empModel.find({}).limit(10);
        console.log(employees);
        return employees;
    }catch(err){
        console.log(err.message);
    }
}
// get the data from employee table:
app.get('/employee', async (req, res)=> {
    try{
        const employees = await empModel.find({}).limit(10);
        // res.send({
        //     status:200,
        //     message:'Data get successfully!',
        //     data:employees
        // });
        res.render('employee_record', {title:'Employee Records', records:employees})
    }catch(err){
        console.log(err.message);
        res.send(err); 
    }
    
})
app.get('/', (req, res)=> {
    res.render('index', {title:'Index'})
})

app.listen(port, () => `Server is running on port ${port}`);