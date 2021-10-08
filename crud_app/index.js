const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// 
const app = express();
var studentRouter = require('./routes/student');

const staticPath = path.join(__dirname, './templates/views')

// set ejs view engine and view folder path.
app.set('views', staticPath);
app.set('view engine', 'ejs');

// using static file path
console.log(path.join(__dirname,'/public'))
app.use(express.static(path.join(__dirname,'/public')))

// parse data in urlencoded and pass to body in json format
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student', studentRouter);

app.listen(4000, () => {
    console.log(`Server is running on port 4000!`);
})