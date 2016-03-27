
'use strict';

const Marchand = require('./Marchand');
const Restaurant = require('./Restaurant');
const Client = require ('./Client');
//const EventEmitter = require('events').EventEmitter;

const HOUR_TO_MIN = 100;

var horloge = function () {
  const ev = new EventEmitter();
  const interv = setInterval(() => ev.emit('hour', i++ % 24 * HOUR_TO_MIN), 1000);
  let i = 0;
  ev.on('hour', (hour) => console.log(`il est ${hour}`));
  setTimeout(() => clearInterval(interv), 490 * HOUR_TO_MIN);
};

var r = new Restaurant();
r.opening(this.horloge);

var marche = new Marchand();
marche.opening();

 var client = new Client();
client.choiceRestaurant();



