import http from 'http';
import fs, { read } from 'fs';

const server = http.createServer()

// read file without stream:

// server.on('request', (req, res) => {
//     fs.readFile('input.txt', "utf-8", (err, data) =>{
//         if(err) console.log(err);
//         // console.log(data);
//         res.end(data);
//     })
// })

// read file with streaming:

server.on('request', (req, res) => {
    // create readable stream:
    const readStreamObject = fs.createReadStream('input.txt',"utf-8" );

    // data event fire if we get the data from streaming
    readStreamObject.on('data', (chunkData) => {
        console.log(chunkData);
        res.write(chunkData);
        // res.end()
    })

    readStreamObject.on('end', () => {
        res.end();
    })

    readStreamObject.on('error', (err)=> {
        console.log(err);
        res.end(err.message)
    })

})
server.listen(8000, 'localhost', ()=> console.log('server is running on port 5000'))
