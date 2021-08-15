var check = require('./check/check');
var calculator = require('./addition');

// here we destructure the object 
const {add, a, b} = calculator;

console.log(check.AnyName); // get from check file in check object 

console.log(__dirname);
console.log(__filename);

console.log(add(a,b));