const express = require('express');
const app = express();
const path = require('path');
const port = 8000;

// use built in static middleware:
const staticPath = path.join(__dirname , '../public');
console.log(staticPath);
app.use(express.static(staticPath));
// create routing:

// syntax:
// app.methodName(url, callback);

app.get('/', (req,res)=>{
    res.write('<h1> Welcome to home page </h1>');
    // we have to pass empty res.send() after using write else it'll give error 
    // "can't set headers afer they are send to the client"
    // res.send('Hello from express')
    res.send();
});

app.get('/about', (req,res)=> {
    res.send('<h1>This is about us page.</h1>')
});

app.get('/contact', (req,res)=> {
    res.status(200).send({
        page:"Contact Us",
        content:'This is contact us page.'
    })
});

app.get('/gettemp', (req,res)=>{
    // res.send() method automatic converts object or array of object to json.
    res.send({
        id:1,
        fname:"Divyansh",
        lname:"Dixit"

    })
    // res.send(undefined)
    // res.json(undefined);
})

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}!`)
})