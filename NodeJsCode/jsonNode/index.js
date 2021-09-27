import fs from 'fs';

const dataObj = {
    name : "Divyansh",
    age: 25,
    position:"Developer"
}

// convert in to json

const dataJson = JSON.stringify(dataObj);

// write this jsonn into other file , creating file usinf fs module

fs.writeFile('data.json', dataJson, (err) => {
    if(err) throw err;
    console.log('File is created and data is added');
})

// read the inserted data and convert back to object

fs.readFile('data.json', 'UTF-8', (err, data)=> {
    console.log('Data is reading!');
    console.log(data);
    const convertedToObj = JSON.parse(data);
    console.log(convertedToObj);
    console.log(JSON.stringify(convertedToObj))
    fs.writeFile('data1.json', JSON.stringify(convertedToObj), (err) => {
        if(err) throw err;
        console.log('file is created');
    })
    
})

// module.exports.dataJson = dataJson;