import http from 'http';
import fs from 'fs';

const server = http.createServer();

server.on('request', (req,res) => {
    // create readable stream 
    const readableStreamObj = fs.createReadStream('input.txt');
    // we'll write  streamed data in response object 
    readableStreamObj.pipe(res);

})
server.listen(5000, () => {
    console.log('server is running on port 5000')
})