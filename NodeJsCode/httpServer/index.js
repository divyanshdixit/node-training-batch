const http = require('http');

// create web server using http.createServer()
const server = http.createServer((req, res) => {
    // req paremter has url property 
    if(req.url == '/about'){
        res.end('<h1> This is about us page! </h1>');
    }else if(req.url == '/contact'){
        res.end('<h1> This is contact us page please contact us for business!</h1>');
    }else if(req.url == '/'){
        res.writeHead(200, {"content-type":"text/html"})
        res.write("<h1> something to write</h1>")
        res.end('hello from response');
    }else{
        res.writeHead(404);
        res.end('404! Page not found');
    }
});

server.listen(8001, 'localhost', () => {
    console.log('Listening to port number 8001')
});
