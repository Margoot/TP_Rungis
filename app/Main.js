
'use strict';

const Marchand = require('./Marchand');
const Restaurant = require('./Restaurant');
const Client = require ('./Client');


var r = new Restaurant();
r.opening();
var marche = new Marchand();
marche.opening();

 var client = new Client();
client.choiceRestaurant();

/*
 client1.chooseRestaurant();
 client1.goRestaurant();
 client1.chooseRecipe();
 */

/*
 const EventEmitter = require('events').EventEmitter;
 const ev = new EventEmitter();
 const interv  = setInterval(() => ev.emit('hour', i++ % 24), 100);
 let i = 0;
 ev.on('hour', (hour) => console.log(`il est ${hour}`));

 setTimeout(() => clearInterval(interv), 4800);

 */
