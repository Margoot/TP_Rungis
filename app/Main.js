/**
 * Created by simonthome on 18/03/2016.
 */
'use strict';


//const Marchand = require ('./Marchand');
const Restaurant = require('./Restaurant');
//const Client = require ('./Client');

var r = new Restaurant();
r.choice(3);

//var marche = new Marchand();
//marche.opening();
/*
 var client1 = new Client();

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

const HOUR_TO_MIN = 100;


var horloge = function () {
    const EventEmitter = require('events').EventEmitter;
    const ev = new EventEmitter();
    const interv = setInterval(() => ev.emit('hour', i++ % 24 * HOUR_TO_MIN), 1000);
    let i = 0;
    ev.on('hour', (hour) => console.log(`il est ${hour}`));

    setTimeout(() => clearInterval(interv), 490 * HOUR_TO_MIN);
};


