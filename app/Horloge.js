'use strict';

const EventEmitter = require('events').EventEmitter;
<<<<<<< HEAD


const ev = new EventEmitter();
const interv  = setInterval(() => ev.emit('hour', i++ % 24), 100);
let i = 0;
ev.on('hour', (hour) => console.log(`il est ${hour}`));
=======
>>>>>>> Bébou-le-rourou

module.exports =  horloge() {
  const ev = new EventEmitter();
  const interv = setInterval(() => ev.emit('hour', i++ % 24 * HOUR_TO_MIN), 1000);
  let i = 0;
  ev.on('hour', (hour) => console.log(`il est ${hour}`));
  setTimeout(() => clearInterval(interv), 490 * HOUR_TO_MIN);
};
return module.exports;