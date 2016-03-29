'use strict';

const Marchand = require('./Marchand');
const Restaurant = require('./Restaurant');
const Client = require('./Client');
const EventEmitter = require('events').EventEmitter;

const HOUR_TO_MIN = 100;

var m = new Marchand();
var r = new Restaurant();
var c = new Client();

const ev = new EventEmitter();
const interv = setInterval(() => ev.emit('hour', i++ % (24*HOUR_TO_MIN)),
  10);
let i = 0;
ev.on('hour', (hour) => console.log(`il est ${hour}`));
console.log(r.getOpenTimeRes());
console.log(r.getCloseTimeRes());



var openRungis = new Promise ((resolve,reject) => {
  ev.on('hour', (hour) => {
    if (hour === m.getOpenTimeRungis()){
      m.openingRungis();
      resolve();}
  });
});

openRungis.then(() => {
  ev.on('hour', (hour) => {
    if (hour === m.getCloseTimeRungis())
      m.closingRungis();
  });
})

if (m.getOpenRungis()){
  r.goRefueling();
}


var openRes = new Promise ((resolve,reject) => {
  ev.on('hour', (hour) => {
    if (hour === r.getOpenTimeRes()){
      r.openingRes();
      resolve();}
  });
});

openRes.then(() => {
  ev.on('hour', (hour) => {
    if (hour === r.getCloseTimeRes())
      r.closingRes();
  });
})


setTimeout(() => clearInterval(interv), (4800*HOUR_TO_MIN));



//m.opening();
//r.goRefueling();
//c.choiceRestaurant();








