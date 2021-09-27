const events = require('events');
// events.EventEmitter;
const emitterObj = new events.EventEmitter();

// const EventEmitter = require('events');
// const event = new EventEmitter();

emitterObj.on('showName', (p1) => console.log(`Event emitted with parameter ${p1}`))

// we can use multiple callback using same event 
emitterObj.on('showName', () => {
    console.log('Second callback function for same event')
})

emitterObj.on('showName', () => {
    console.log('third callback function for same event')
})

emitterObj.emit('showName', 'param1')