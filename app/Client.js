'use strict'

const Promise = require('bluebird');

//definition de variable
const MIN_TO_SEC = 100;
const HOUR_TO_SEC = 10000;


class Client {
    constructor() {
        this.clientNumber = 1;
        this.hunger = true;
        //this.resistance = Math.floor((Math.random() * 4000) + 1000);
        this.openRestaurant = true;


    }


    goRestaurant() {
        var goRestaurantPromise = new Promise(function (resolve, reject) {
            if (this.hunger && this.openRestaurant) {
                resolve('+1 client');
            }
            else {
                reject('try an other one');
            }
        });

        goRestaurantPromise
            .then(result => (result) => {console.log(result)})
            //appel de la promise chooseRecipe si le client est dans le restaurant chooseRecipe.on
            .catch(err => (err) => {console.log(err)});
                //appel de la promise chooseRestaurant si le client n'a pas dans le restaurant chooseRestaurant.on

    }

}

var client1 = new Client();

client1.goRestaurant();