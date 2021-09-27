const fs = require('fs');
const http =  require('http');
const server = http.createServer((req,res)=>{
    let jsonData;
    // we'll rad json file and get the data from there,an make our own apis
    const data = fs.readFileSync(`${__dirname}/userApi/userapi.json`, 'utf-8')
    jsonData = JSON.parse(data);

    if(req.url == '/'){
        res.writeHead(200, {"Content-type":"text/html"})
        res.end('<h1> This is home page. </h1> ')
    }else if (req.url == '/about'){
        res.writeHead(200, {"Content-type":"text/html"})
        res.end('<h1> Welcome to about page  </h1>')
    }else if(req.url == '/contact'){
        res.writeHead(200, {"Content-type":"text/html"})
        res.end('<h1>Welcome to contact us page </h1>')
    }else if(req.url == "/user/api"){
        res.writeHead(200, {"Content-type":"application/json"});
        res.end(data); // it'll not take array 
    }else{
        res.writeHead(404, {"Content-type":"text/html"})
        res.end('<h1> 404! Page not found </h1>')
    }
}).listen(3001,'localhost', () => {
    console.log('Server is running on port 3001')
})