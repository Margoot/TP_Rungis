'use strict';

//client de Margot

const Promise = require('BlueBird');
const chalk = require('chalk');
const Restaurant = require('./Restaurant');
const Marchand = require('./Marchand');

var HOUR_TO_MIN = 100;
var NB_RESTAURANT = 3;
var NB_RECIPE = 2;


module.exports = class extends Restaurant {
  constructor() {
    super();
    this.clientNumber = 1
    //this.hunger = true;
    this.resistance = Math.floor((Math.random() * 40) + 10);
    //this.openRestaurant = true;
  }

  choiceRestaurant() {
    this.restauChoice = Math.floor((Math.random() * NB_RESTAURANT) + 0);
    switch (this.restauChoice) {
      case 0 :
        //this.opening(this.ev);
        //if (this.open) {
        //console.log("le restau est ouvert");
        this.restaurantItalian();
        console.log("Bienvenue dans le restaurant Italien ! ");
        this.chooseRecipe();

        break;
      case 1 :
        //if (this.open)
        this.restaurantJap();
        console.log("Bienvenue dans le restaurant Japonnais ! ");
        this.chooseRecipe();
        break;
      case 2 :
        //if (this.open)
        this.restaurantFrench();
        console.log("Bienvenue dans le restaurant Français ! ");
        this.chooseRecipe();
        break;
      default :
        console.log(`Error : ${err}`);
    }

  }


  chooseRecipe() {
    var recipe = Math.floor((Math.random() * (NB_RECIPE)) + 0);
    switch (recipe) {
      case 0 :
        console.log("Nous allons vérifier que votre recette est réalisable");
        this.createRecipe1()
          .then(() => {
            this.useIngredients(this.recipe1);
            this.cook();
          })
          .catch(() => {
            this.createRecipe2()
              .then(() => {
                this.useIngredients(this.recipe2);
                this.cook();
              })
              .catch(
                () => console.log("aucune recette n'est disponible, bye bye"));
          });
        break;
      case 1 :
        console.log("Nous allons vérifier que votre recette est réalisable");
        this.createRecipe2()
          .then(() => {
            this.useIngredients(this.recipe2);
            this.cook();
          })
          .catch(() => {
            this.createRecipe1()
              .then(() => {
                this.useIngredients(this.recipe1);
                this.cook();
              })
              .catch(
                () => console.log("aucune recette n'est disponible, bye bye"));
          });
        break;
    }

  }

  /*

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
   */
}
return module.exports;

