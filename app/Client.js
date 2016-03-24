'use strict'

const Promise = require('bluebird');

//definition de variable
const MIN_TO_SEC = 100;
const HOUR_TO_SEC = 10000;


class Client {
    constructor(clientNumber, hunger, resistance) {
        this.clientNumber = 1;
        this.hunger = true;
        this.resistance = Match.floor(Math.random() * (4000) + 1000);


    }
}
var goRestaurant = new Promise(function(resolve,reject) {
    if (this.hunger == true && openRestaurant == true) {
        resolve('+1 client')
    }
    else
    {
        reject('try an other one')
    }
});

goRestaurant.then(function() {
    //appel de la promise chooseRecipe si le client est dans le restaurant
        chooseRecipe.on
    }).catch(function(){
    //appel de la promise chooseRestaurant si le client n'a pas dans le restaurant
    chooseRestaurant.on
});
