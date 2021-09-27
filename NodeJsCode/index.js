var check = require('./check/check');
var calculator = require('./addition');
const fs = require('fs');

// here we destructure the object 
const {add, a, b} = calculator;

console.log(check.AnyName); // get from check file in check object 

console.log(__dirname);
console.log(__filename);

console.log(add(a,b));

// Challenge 1 -> create a folder and add file and add data:

fs.mkdirSync('challenge1');

fs.writeFileSync('challenge1/index.txt', "challenge 1 data");

fs.appendFileSync('challenge1/index.txt', 'add more data into the file')

console.log(fs.readFileSync('challenge1/index.txt', 'UTF-8'));

fs.renameSync('challenge1/index.txt', 'challenge1/bio.txt')

fs.unlinkSync('challenge1/bio.txt')

// this will not work for folder or directory
// fs.unlinkSync('challenge1', (err)=> {
//     console.log('folder is deleted!')
// })

// use rmdir() to delete folder
fs.rmdirSync('challenge1')


// Challenge 2 -> crud using async 

fs.mkdir('challenge2', (err)=> {
    if(err) throw err;
    console.log('folder is created');
    fs.writeFile('challenge2/index.txt', 'create file in async way', (err)=> {
        if(err) throw err;
        console.log('File is created and data is written!')
        fs.appendFile('challenge2/index.txt', ' More data is added in same file async', (err) => {
            if(err) throw err;
            console.log('More data is added successfully!')
            fs.readFile('challenge2/index.txt', 'UTF-8', (err, data) => {
                if(err) throw err;
                console.log(data);
                fs.rename('challenge2/index.txt', 'challenge2/rename.txt', (err)=>{
                    if(err) throw err;
                    console.log('File is renamed!');
                    fs.unlink('challenge2/rename.txt', (err)=>{
                        if(err) throw err;
                        console.log('File is deleted successfully!');
                        fs.rmdir('challenge2', (err)=>{
                            if(err) throw err;
                            console.log('Folder is deleted!');
                        })
                    })
                })
            })
        })
    })
})