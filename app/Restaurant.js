/**
 * Created by simonthome on 18/03/2016.
 */
'use strict';

const Promise = require ('bluebird');

const MIN_TO_SEC = 100;
const HOUR_TO_SEC = 10000;

class Restaurant {
    constructor() {
        this.openTime = Math.floor((Math.random() * (24 * HOUR_TO_SEC)) + (HOUR_TO_SEC));
        this.closeTime = Math.floor((Math.random() * (24 * HOUR_TO_SEC)) + (HOUR_TO_SEC));
        this.open = false;
        this.cookTime = Math.floor((Math.random() * (50 * MIN_TO_SEC)) + (5 * MIN_TO_SEC));

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
                var numIng = 0; // instanciation du nbr d'ingrédient à 0
                // vérification si les ingrédients sont dispo dans le stock
                for (var i in this.recipeA) {
                    for (var j in this.stock) {
                        if (i === j) {
                            if (stock[j] > 0) {
                                numIng++; //si l'ingrédient est dispo dans le stock, on incrémente numIng
                            }
                        }

                    }
                }
                resolve(numIng===5); // resolve si le nombre d'ingrédients est de 5 (car la recette est composée de 5 ing)
            });

            //fonction pour décrémenter le nombre d'ingrédients présents dans le stock
            var consumption = function () {
                for (var i in this.recipeA) {
                    for (var j in this.stock) {
                        if (i === j)
                            this.stock[j]--;
                    }
                }
            };
            //si c'est ok, on décrémente le nbr d'ingrédients, sinon on passe à la recette B
            prepare
                .then(consumption.bind(this))
                //.then(cookTime())  // fonction non disponible pour le moment
                .catch(this.createRecipeB);

        }

    createRecipeB() {

        var prepare = new Promise( (resolve, reject) => {
            var numIng = 0;
            for (var i in this.recipeB) {
                for (var j in this.stock) {
                    if (i === j) {
                        if (stock[j] > 0) {
                            numIng++;
                        }
                    }

                }
            }
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
            //.then(cookTime())  //fonction non défini pour le moment
            .catch(console.log("aucune recette n'est disponible, bye bye"));
            

    }

}

var r = new Restaurant;
r.createRecipeA();




