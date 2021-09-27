// const http = require('http');
import http from 'http';
// const fs = require('fs');
import fs from 'fs';
import requests from 'requests';

const server = http.createServer();

const homeFile = fs.readFileSync('home.html', 'utf-8');

const replaceVal = (tempVal, updateVal) => {
    // all temperature converted from kelvin to celsius
    let newFile = tempVal.replace("{%tempVal%}", (updateVal.main.temp - 273.15).toFixed(2));
    newFile = newFile.replace("{%tempMin%}", (updateVal.main.temp_min-273.15).toFixed(2));
    newFile = newFile.replace("{%tempMax%}", (updateVal.main.temp_max - 273.15).toFixed(2));
    newFile = newFile.replace("{%location%}", updateVal.name);
    newFile = newFile.replace("{%country%}", updateVal.sys.country);
    newFile = newFile.replace("{%tempStatus%}", updateVal.weather[0].main);
    return newFile;
}
const getDataFunction = (request, response) => {
   return requests('http://api.openweathermap.org/data/2.5/weather?q=Kanpur&appid=564aa4bcd8656c2f4f1dc9e37b46c50b', 'utf-8')
        .on("data", (chunkdata)=>{
            const objData = JSON.parse(chunkdata);
            const arrData = [objData];
            // convert fahrenheit to celsius:
            // (32°F − 32) × 5/9 = 0°C
            // covert kelvin to celsius:
            // 0K − 273.15 = -273.1°C
            
            const replacedData = arrData.map((val) => {
                return replaceVal(homeFile, val);
            }).join('')
            response.end(replacedData);
            console.log(replacedData);
            console.log(chunkdata, objData, arrData, arrData[0].main.temp, (arrData[0].main.temp - 32) * (5/9));
        })
        .on("end", (err)=>{
            if(err)
            console.log(`Connection closed due to error: ${err}`)
            response.end();
        })
}
server.on('request', (req, res) => {
    if(req.url == '/'){
        // we can write whole function defination here in if block but we can make another function 
        getDataFunction(req, res);
    }else{
        // if you want to redirect the user to base url then follow below code:
        res.writeHead(301,
            {Location: '/'}
          );
        res.end();

        // and if you want to show the same weather data to any page user visit follow the below code:
        
        
        /* req.url = '/';
        if(req.url == '/'){
            getDataFunction(req, res);
        } */
        
    }
    // Read file through stream using (fs) module, we can do it from other way:

    // const readStreamObj = fs.createReadStream('home.html', 'utf-8');
    // readStreamObj.on("data", (chunkdata)=> {
    //     console.log(chunkdata);
    //     res.end(chunkdata);
    // })
    // readStreamObj.on("end", ()=> {
    //     res.end();
    // })
    // readStreamObj.on('error', (err)=> {
    //     res.end(`Connection closed due to error: ${err}`);
    // })
    
});

server.listen(8000, ()=> {
    console.log('Server is running on 8000!')
})