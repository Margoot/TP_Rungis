/**
 * Created by simonthome on 18/03/2016.
 */
'use strict';

const Promises = require ('bluebird');

const MIN_TO_SEC = 100;
const HOUR_TO_SEC = 10000;



class Restaurant {
    constructor(stock) {
        this.openTime = Math.floor((Math.random() * (24*HOUR_TO_SEC)) + (HOUR_TO_SEC));
        this.closeTime = Math.floor((Math.random() * (24*HOUR_TO_SEC)) + (HOUR_TO_SEC));
        this.open = false;
        this.cookTime = Math.floor((Math.random()* (50*MIN_TO_SEC)) + (5*MIN_TO_SEC));
        this.stock = new Array();


    }
    
}