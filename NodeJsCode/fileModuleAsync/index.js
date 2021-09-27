const fs = require('fs');
const http = require('http');

// create file and write data async : callback function is required

fs.writeFile('asyncfile.txt', "Some data", (err) => {
    console.log('file is created ');
    console.log(err);
})

// changed data to existing file : using appendFile('filename', 'data', cb)

fs.appendFile('asyncfile.txt', ' Remainign data is added now!', (err) => {
    console.log('Data is added to existing file.')
})

// read file async: using readFile(filename, 'file-encoding', cb(err,data))

fs.readFile('asyncfile.txt', 'UTF-8',  (err,data) => {
    if(err) throw err;
    console.log(data);
});

// read file data and show it to web page using http and fs modules

const server = http.createServer((req, res) => {
    fs.readFile('asyncfile.txt',(err,data)=>{
        // res.writeHead(200, {"Content-type":"text/plain"});
        console.log(data)
        if(err) throw err;
        res.write(data);
        res.end(data);
    })
}).listen(8000, '127.0.0.1',() => {
    console.log('server is running on port 8000')
})