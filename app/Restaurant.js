/**
 * Created by simonthome on 18/03/2016.
 */
'use strict';

const Promise = require ('bluebird');

const MIN=1;
const HOUR_TO_MIN = 100;

class Restaurant {
    constructor() {
        this.openTime = Math.floor((Math.random() * (24 * HOUR_TO_MIN)) + (HOUR_TO_MIN));
        this.closeTime = Math.floor((Math.random() * (24 * HOUR_TO_MIN)) + (HOUR_TO_MIN));
        this.open = false;
        this.cookTime = Math.floor((Math.random() * 50) + 5);

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

        this.recipeA = {
            "eggs": 1,
            "pasta": 1,
            "bacon": 1,
            "creme": 1,
            "onions": 1
        };

        this.recipeB = {
            "salad": 1,
            "tomatoes": 1,
            "mozarella": 1,
            "chicken": 1,
            "parmesan": 1
        };

    }

createRecipeA() {

    var prepare = new Promise((resolve, reject) => {
        var numIng = 0;
        for (var i in this.recipeA) {
           for (var j in this.stock) {
               if (i === j) {
                   if (this.stock[j] > 0) {
                       numIng++;
                   }
               }

           }
        }
    console.log(numIng);
    resolve(numIng===5);
});

var consumption = function () {
   console.log("consumption");
   for (var i in this.recipeA) {
       for (var j in this.stock) {
           if (i === j)
               this.stock[j]--;
        }
    }
    console.log(this.stock);
};

var cookTime = function (){
    console.log(this.cookTime);


}
    prepare
        .then(consumption.bind(this))
        .then(cookTime.bind(this))
        .catch(this.createRecipeB);

}

createRecipeB(){

    console.log ( "recette B : ");
    var prepare = new Promise( (resolve, reject) => {
        var numIng = 0;
        for (var i in this.recipeB) {
           for (var j in this.stock) {
               if (i === j) {
                  if (this.stock[j] > 0) {
                     numIng++;
                   }
                }

           }
        }
        console.log(numIng);
        resolve(numIng===5);
    });

var consumption = function () {
    for (var i in this.recipeB) {
        for (var j in this.stock) {
            if (i === j)
              this.stock[j]--;
        }
    }
};
        prepare
            .then(consumption.bind(this))
            //.then(cookTime())
            .catch(console.log("aucune recette n'est disponible, bye bye"));
            

    }

}

var r = new Restaurant;
r.createRecipeA();




