const express = require('express');
const app = express();
const expressPartials = require('express-partials');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser');
// for validation use express-validator:
const {body, validationResult, matchedData} = require('express-validator');

const path = require('path');
const { errorMonitor } = require('events');

const port = 9000;
// to set the view engine :
app.set('view engine', 'ejs');

// parse data in urlencoded and pass to body in json format
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// get and serve static files
// const staticPath = path.join(__dirname, "../public");
// app.use(express.static(staticPath));

// change default folder for views 
const templatePath = path.join(__dirname, '../templates/views')
app.set('views', templatePath)

const partialsPath = path.join(__dirname, '../templates/partials')

// template engine route:
app.get("/", (req,res, next)=>{
    // res.render('index') // only render file with no data 
    res.render('index', {name:"Divyansh Dixit", template:"EJS", partials:partialsPath})
})
// this will not run because we already define home route above using template engine :

app.get('/',(req,res)=>{
    res.send('home page');
})
app.get('/about', (req,res)=>{
    res.render('about', {partials:partialsPath})
})

app.get('/users/:id', (req, res) => {
    console.log(req.params)
    res.send('Users data');
})

// login form route:

const loginFormVars = {
    title:"Login Form",
    errors:'',
    user:''
}

app.get('/login', (req,res)=>{
    res.render('loginForm', loginFormVars)
})

// post route for login form:

// app.post('/dashboard', (req, res)=>{
//     console.log(req.body);
//     const {username, password} = req.body;
//     res.render('dashboard', {username, password})
// })

app.post('/login', 
    body('username').isLength({min:2}).withMessage(`Username can't be less than 2 chars`).isAlpha().withMessage(`Username contain only Alphabets`),
    body('password', `Password can't be empty and minimum 5 chars long!`).isLength({min:5}),
    body('cpassword'). custom((value, {req}) =>{
        if(value !== req.body.password){
            throw new Error(`Confirm password not match with password`);
        }
        return true;

    }),
    (req, res)=>{
        const errors = validationResult(req);
        console.log(errors.mapped(), Object.keys(errors.mapped()).length);
        if(!errors.isEmpty()){
            loginFormVars.errors=errors.mapped();
            loginFormVars.user = matchedData(req);
            console.log(loginFormVars);
            // return res.status(400).json({error:errors.array()});
            return res.render('loginForm', loginFormVars)
        }else{
            const {username, password} = req.body;
            const user = matchedData(req);
            console.log(user);
            return res.render('dashboard', {user:user})
        }
    });

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})
