const events = require('events');
// make a event object using EventEmitter function of events object :
const eventObj = new events.EventEmitter();

eventObj.on('custom', (p1,p2)=> {
    console.log('Custom event using Node js ' + p1 + ' ' +  p2);
})

eventObj.emit('custom','First parameter', 20);

// Event inside an event : nested event 

const firstEvent = function(){
    console.log('First event');
    // second event inside first event (second event automatic call)
    eventObj.emit('second');
    eventObj.emit('third');
}

const secondEvent = function(){
    console.log('second event');
    eventObj.emit('third', 4,5);
}

const thirdEvent = function(param1, param2){
    console.log(`third event ${param1} ${param2}`);
}

eventObj.on('first', firstEvent);
eventObj.on('second', secondEvent);
eventObj.on('third', thirdEvent);
eventObj.emit('first');

// this code doesn't work here bcz first event fire first so he doesn't know what is second event 
eventObj.on('second', secondEvent);

