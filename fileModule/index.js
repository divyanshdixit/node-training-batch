const fs = require('fs');
const http = require('http');

// to create file and write data synchronsly

fs.writeFileSync('readWriteFile.txt', 'Data changed successfully!')

// to append new data to same file 

fs.appendFileSync('readWriteFile.txt', ' New data is appended suucessfully!');

// to read the file sync:
// use readFileSync('filename') => this returns bufferData not actual data
// Buffer is mainly used to store Binary data wjile reading file 

var bufferData = fs.readFileSync('readWriteFile.txt');

// to convert buffer data to string : use toString()

var originalData = bufferData.toString();

console.log(originalData);

// to rename file name: use fs.renameSync(oldpath,newpath)

fs.renameSync('readWriteFile.txt', 'readwrite.txt')


// to read file async 

fs.readFile('readwrite.txt', (err, data) => {console.log(data)})


// read file and show content to web page using server

const server = http.createServer((req, res) => {
    fs.readFile('readwrite.txt', (err,data) => {
        res.writeHead(200, {"Content-type":"text/plain"});
        res.write(data);
        res.end();
    })
}).listen(8000, 'localhost', () => {console.log('server is running on port 8000')})


console.log('object')