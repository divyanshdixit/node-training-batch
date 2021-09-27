const express = require('express');
const app = express();
const externalMiddleware = require('./middleware-file');

const mw = function(req, res, next){
    console.log(req.url);
    
    // if(req.url == '/')
        console.log('middleware running')
    next();
}

const validationMiddleware = function(req, res, next){
    console.log('validation middleware');
    if(req.params.username){
        console.log('User validated!')
    }else
        console.log('User not validated!')
    next();
}

// if any middleware want to run globally(to all route use below)
app.use(mw);

app.get('/', (req, res)=>{
    res.send('Home route')
});

app.get('/users/:username?', [validationMiddleware,externalMiddleware({option1:"first option", option2:"Second option"})] , (req,res)=>{
    if(req.params.username)
        res.send(`Get the data for username ${req.params.username}`)
    else
        res.send('Get all the data');
})

app.listen(3000,()=>{
    console.log(`Server is running on port 3000`);
})