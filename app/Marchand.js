/**
 * Created by simonthome on 18/03/2016.
 */
'use strict'

const Promise = require('bluebird');
const winston = require('winston');

const MIN_TO_SEC = 100;
const HOUR_TO_SEC = 10000;

class Marchand {
    constructor (){
        this.openTime = 5*HOUR_TO_SEC;
        this.closeTime = 14*HOUR_TO_SEC;
        this.refuelingTime = Math.floor((Math.random() * (HOUR_TO_SEC + 15*MIN_TO_SEC)) + 15 * MIN_TO_SEC);
        this.open = false;
        this.stock = ["Bacon","Pasta","Creme","Eggs","Onions","Salad","Tomatoes","Mozarella","Chicken","Parmesan"];
    }






}
