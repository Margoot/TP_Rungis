'use strict ';

<<<<<<< HEAD
const Promise = require ('BlueBird');
const chalk =  require ('chalk');
=======
//client de Margot

const Promise = require('BlueBird');
const chalk = require('chalk');
const Restaurant = require('./Restaurant');
const Marchand = require('./Marchand');
>>>>>>> Bébou-le-rourou

const Restaurant = require ('./Restaurant');

var MIN = 1;
var HOUR_TO_MIN = 100;
var NB_RESTAURANT = 3;
var NB_RECIPE = 2;


class Client {
    constructor() {
        this.clientNumber = 1;
        this.hunger = true;
        this.resistance = Math.floor((Math.random() * (40*MIN)) + (10*MIN));
        this.openRestaurant = true;
    }

    chooseRestaurant(restau, meal){
        var restaurant = Math.floor((Math.random() * (NB_RESTAURANT)) + 0);
        switch (restaurant){
            case 0:
                restau = restaurantA;
                chooseRecipe();
                console.log("You are in the restaurant : " + $`restau` + " and the recipe : " + $`meal`);
                break;
            case 1:
                restau = restaurantB;
                chooseRecipe();
                console.log("You are in the restaurant : " + $`restau` + " and the recipe : " + $`meal`);
                break;
            case 2:
                restau = restaurantC;
                chooseRecipe();
                console.log("You are in the restaurant : " + $`restau` + " and the recipe : " + $`meal`);

                break;
            default:
                console.log("You didn't find any restaurant, sorry ! ")

        }
    }


    chooseRecipe(meal){
        var recipe = Math.floor((Math.random() * (NB_RECIPE)) + 0);
        if (recipe === 0){
            meal = recipeA;
        }
        else {
            meal = recipeB;
        }
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
            .catch(err => (err) => {console.log(err)})
        //appel de la promise chooseRestaurant si le client n'a pas dans le restaurant chooseRestaurant.on

    }
}


