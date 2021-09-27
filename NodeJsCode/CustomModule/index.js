// const customModule = require('./modules');

// when we export single thing as module then we can direcly use it like below:

// var showName = customModule('Divyansh Dixit');
// console.log(showName);

// console.log(customModule.showCityName('Kanpur'));

// var showEmail = customModule.showEmail('devilme.dd@gmail.com');
// console.log(showEmail);


// ============================

// const customModules = require('./modules');
// or we can destructure the object to avoid writing object name again and again.
const {showName,showCityName, showEmail}= require('./modules');

// here customModules variable is an object:

// var Name = customModules.showName('Divyansh Dixit');
var Name = showName('Divyansh Dixit');
console.log(Name);
// var CityName = customModules.showCityName('Kanpur');
var CityName = showCityName('Kanpur');
console.log(CityName);
// var Email = customModules.showEmail('devilme.dd@gmail.com');
var Email = showEmail('devilme.dd@gmail.com');
console.log(Email);