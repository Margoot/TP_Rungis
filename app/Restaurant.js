'use strict';


const Promise = require('bluebird');

const HOUR_TO_MIN = 100;
const MIN_TO_MILLISECONDE = 10000;

const Marchand = require ('./Marchand');
<<<<<<< HEAD


=======


>>>>>>> Bébou-le-rourou
module.exports = class extends Marchand {
  constructor() {
    super();
    this.openTime =
      Math.floor((Math.random() * 24*HOUR_TO_MIN) + HOUR_TO_MIN); //en heure
    this.closeTime =
      Math.floor((Math.random() * 24*HOUR_TO_MIN) + HOUR_TO_MIN); //en heure
    this.open = false;
    this.cookTime = Math.floor((Math.random() * 50) + 5);

  }
  //======= OPENING =========

<<<<<<< HEAD
  opening(ev){
    if  (ev >= this.openTime && ev <= this.closeTime){
      //console.log("le restaurant est ouvert");
      this.open = true;
    }
    else
      this.open = false;


    //console.log("l'heure d'ouverture est : "+ this.openTime +"h");
    return new Promise (() => (resolve, reject){
      // appeler fonction horloge
      //console.log("il est : " + hourHorloge + "votre restaurant est " + this.open );
      if (this.open){
        
      }




    });





    console.log("l'heure de fermeture est : " + this.closeTime + "h");
  }

  //====== REFUELING ========

  goRefueling(){

  }


=======
  //======= OPENING =========

  opening(horlogeTime){
    if  (horlogeTime >= this.openTime && horlogeTime <= this.closeTime){
      this.open = true;
      //console.log("le restaurant est ouvert");
    }
    else
      this.open = false;
  };

    //console.log("l'heure d'ouverture est : "+ this.openTime +"h");
    //return new Promise (() => (resolve, reject){
      // appeler fonction horloge
      //console.log("il est : " + hourHorloge + "votre restaurant est " + this.open );
      //if (this.open){
        
      //}
    //console.log("l'heure de fermeture est : " + this.closeTime + "h");


  //====== REFUELING ========
/*
  goRefueling(){

  }

*/
>>>>>>> Bébou-le-rourou
//======== RESTAURANTS INSTANCIATION  =======
  restaurantItalian() {
    this.stock = {
      "eggs": 20,
      "pasta": 20,
      "bacon": 20,
      "cream": 20,
      "onions": 20,
      "salad": 20,
      "tomatoes": 20,
      "mozarella": 20,
      "chicken": 20,
      "parmesan": 20
    };

    this.recipe1 = {
      "eggs": 1,
      "pasta": 1,
      "bacon": 1,
      "cream": 1,
      "onions": 1
    };

    this.recipe2 = {
      "salad": 1,
      "tomatoes": 1,
      "mozarella": 1,
      "chicken": 1,
      "parmesan": 1
    };

  }

  restaurantJap() {

    this.stock = {
      "sushi": 30,
      "california": 30,
      "maki": 30,
      "brochettes": 30,
      "miso soup": 30,
      "ramen": 20,
      "maki nutella": 10

    };

    this.recipe1 = {
      "sushi": 1,
      "california": 1,
      "maki": 1,
      "brochettes": 1
    };

    this.recipe2 = {
      "miso soup": 1,
      "ramen": 1,
      "maki nutella": 1
    };

  }

  restaurantFrench() {

    this.stock = {
      "beef": 20,
      "onion": 20,
      "sauce": 30,
      "riz": 40,
      "bread": 50,
      "potatoes": 30,
      "cheese": 20,
      "ham": 20,
      "carrot": 30
    };

    this.recipe1 = {
      "beef": 1,
      "onion": 1,
      "sauce": 1,
      "riz": 1,
      "bread": 1
    };

    this.recipe2 = {
      "potatoes": 1,
      "cheese": 1,
      "ham": 1,
      "carrot": 1
    };


  }


  // ==========RECIPE CREATION=========

  createRecipe1() {
    console.log("recette 1 ");
    return new Promise((resolve, reject) => {
      var numIng = 0;
      for (var i in this.recipe1) {
        for (var j in this.stock) {
          if (i === j) {
            if (this.stock[j] > 0) {
              numIng++;
            }
          }
        }
      }
      console.log(numIng);
      if (numIng ===Object.keys(this.recipe1).length)
        resolve();
      else
        reject();
    });
  }

  useIngredients(recipe) {
    console.log("useIngredients");
    for (var i in recipe) {
      for (var j in this.stock) {
        if (i === j && this.stock.hasOwnProperty(j)) {
          this.stock[j]--;
        }
      }
    }
    console.log(this.stock);
  };

  cook() { //prend en param un client
    setTimeout(()=> {
      console.log("Le plat est prêt!!");
    }, this.cookTime * MIN_TO_MILLISECONDE);
  }

  createRecipe2() {

    console.log("recette 2");
    return new Promise((resolve, reject) => {
      var numIng = 0;
      for (var i in this.recipe2) {
        for (var j in this.stock) {
          if (i === j && this.stock.hasOwnProperty(j)) {
            if (this.stock[j] > 0) {
              numIng++;
            }
          }
        }
      }
      console.log(numIng);
      if (numIng === Object.keys(this.recipe2).length)
        resolve();
      else
        reject();
    });
  }

}


return module.exports;
