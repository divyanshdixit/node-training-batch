const http = require('http');

// create web server using http.createServer()
const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type":"text/html"})
    res.write("<h1> something to write</h1>")
    res.end('hello from response');
});

server.listen(8001, 'localhost', () => {
    console.log('Listening to port number 8001')
});
