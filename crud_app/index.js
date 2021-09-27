const express = require('express');
const path = require('path');

const app = express();
var studentRouter = require('./routes/student');

const staticPath = path.join(__dirname, './templates/views')

// set ejs view engine and view folder path.
app.set('views', staticPath);
app.set('view engine', 'ejs');

// using static file path
app.use(express.static('public'))

app.use('/student', studentRouter);

app.listen(4000, () => {
    console.log(`Server is running on port 4000!`);
})