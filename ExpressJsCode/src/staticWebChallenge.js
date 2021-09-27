const express = require('express');
const app = express();
const path = require('path');
const port = 7000;

const staticPath = path.join(__dirname, '../public/new.html')

app.use(express.static(`${staticPath}`))

app.get('/', (req,res)=>{
    res.send(`Home page for port ${port}`)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})