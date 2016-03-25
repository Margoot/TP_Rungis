/**
 * Created by simonthome on 18/03/2016.
 */
'use strict';


const Promise = require('bluebird');

const HOUR_TO_MIN = 100;
const MIN_TO_MILLISECONDE = 10000;


module.exports = class Restaurant {
  constructor() {
    this.openTime =
      Math.floor((Math.random() * (24 * HOUR_TO_MIN)) + (HOUR_TO_MIN));
    this.closeTime =
      Math.floor((Math.random() * (24 * HOUR_TO_MIN)) + (HOUR_TO_MIN));
    this.open = false;
    this.cookTime = Math.floor((Math.random() * 50) + 5);

  }

  //======= CLIENT CHOICE (SERA MIS DANS LA CLASSE CLIENT)======
  choice(restauChoice) {
    switch (restauChoice) {
      case 1 :
        this.restaurantItalian();
        break;
      case 2 :
        this.restaurantJap();
        break;
      case 3 :
        this.restaurantFrench();
        break;
      default :
        console.log("mauvais choix");
    }
  }

//======== RESTAURANTS INSTANCIATION  =======
  restaurantItalian() {
    this.stock = {
      "eggs": 20,
      "pasta": 20,
      "bacon": 20,
      "creme": 20,
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
      "creme": 1,
      "onions": 1
    };

    this.recipe2 = {
      "salad": 1,
      "tomatoes": 1,
      "mozarella": 1,
      "chicken": 1,
      "parmesan": 1
    };

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
          .catch(() => console.log("aucune recette n'est disponible, bye bye"));
      });

  }

  restaurantJap() {

    this.stock = {
      "sushi": 30,
      "california": 30,
      "maki": 30,
      "brochettes": 30,
      "soupe miso": 30,
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
          .catch(() => console.log("aucune recette n'est disponible, bye bye"));
      });


  }

  restaurantFrench() {

    this.stock = {
      "beef": 20,
      "onion": 20,
      "sauce": 30,
      "riz": 40,
      "bread": 50,
      "pommes de terre": 30,
      "fromage": 20,
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
      "pommes de terre": 1,
      "fromage": 1,
      "ham": 1,
      "carrot": 1
    };

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
          .catch(() => console.log("aucune recette n'est disponible, bye bye"));
      });
  }


  // ==========RECIPE CREATION=========
  createRecipe1() {
    console.log("recette A ");
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

    console.log("recette B");
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

var r = new Restaurant();
r.choice(3);

