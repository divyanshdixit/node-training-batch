import fetch from 'node-fetch';
console.log('Async await file');

async function runAsync(){
    console.log('inside async function');
    const result = await fetch('https://api.github.com/users');
    console.log('before response');
    const users = await result.json();
    
    console.log('users resolved!');
    return users;

}

console.log('Before calling async function');
const a = runAsync();
console.log('Afrer calling asycn function')
console.log(a);
a.then((res) => {console.log(res)});
console.log('last line of js file ')
