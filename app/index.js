'use strict'

const Promise = require('bluebird');

//definition de variable
var tpsRes= 3001;
var tpsResMin = 1000;
var Client = [];


class Client{
    constructor(numClient, faim, resistance){
        this.numClient = 1;
        this.faim = true;
        this.resistance = Math.random() * (tpsRes) + tpsResMin;

        this.addClient = function(numClient, faim, resistance){
            this.Client.push(new Personne(numClient, faim, resistance));
        };

    }