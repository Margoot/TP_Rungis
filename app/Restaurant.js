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

        var Prepare = new Promise( function (resolve,reject){
            var numIng = 0;
            for (var i in this.recipeA) {
                for (var j in this.stock) {
                    if (i === j){
                        if (this.stock[j] !== 0){
                            numIng++;
                        }
                    }

                }
            }
            resolve(numIng === 5);

        });

            var consumption = function () {
                for (var i in this.recipeA) {
                    for (var j in this.stock){
                        if(i === j)
                            this.stock[j]--;
                    }
                }
            };

            Prepare
                .then(consumption())
                //.then(cookTime())
                .catch(this.createRecipeB());

    }

    createRecipeB() {


            //var recipeB = this.recipeB; Ca ne marche pas
            //on ne peut pas utiliser les objets
            //on ne peut pas utiliser les elements du contructeur
            // tout ça à vérifier
            console.log(this.recipeB);

            /*var rec = {
                "salad": 1,
                "tomatoes": 1,
                "mozarella": 1,
                "chicken": 1,
                "parmesan": 1
            }*/ //Comme ça non plus ça ne marche pas

        //seul moyen :
            var rec = ["salad","tomatoes","mozarella","chicken","parmesan"];

            var prepare = new Promise(function (resolve, reject) {

                    var numIng = 0;
                    for (var i = 0; i < rec.length; i++)
                        numIng += 1;//console.log(element);


                    /* for (var j in this.stock) {
                     if (i === j) {
                     if (this.stock[j] !== 0) {
                     numIng++;
                     }
                     }

                     }*/
                    resolve(numIng);
                }
                //resolve(numIng);

            );

            /*var consumption =function () {
             for (var i in this.recipeB) {
             for (var j in this.stock){
             if(i === j)
             this.stock[j]--;
             }
             }
             };*/

            prepare
                .then(function (result) {
                    console.log(result)
                })
                //.then(cookTime())
                .catch(function () {
                    console.log("No more recipies bye bye")
                }); //delete client
        };



/*
        createRecetteA() {
            var dispoRecette = true;
            for (var k in this.recetteA) {
                for (var item in this.stock) {
                    //console.log(item);
                    if (k === item) {
                        if (this.stock[item] !== 0)
                            console.log("consommation de " + k);
                        else
                            dispoRecette = false;
                    }
                }
            }
            if (dispoRecette)
            {
                for (var k in this.recetteA) {
                    for (var item in this.stock){
                        if(k === item)
                            this.stock[item]--;
                    }
                }

            }
            else {
                this.createRecetteB();
                //delete client
            }

        };


        createRecetteB() {
            var dispoRecette = true;
            for (var k in this.recetteB) {
                for (var item in this.stock) {
                    //console.log(item);
                    if (k === item) {
                        if (this.stock[item] !== 0)
                            console.log("consommation de " + k);
                        else
                            dispoRecette = false;
                    }
                }
            }
            if (dispoRecette)
            {
                for (var k in this.recetteB) {
                    for (var item in this.stock){
                        if(k === item)
                            this.stock[item]--;
                    }
                }

            }
            else {
                console.log("il n y a plus de recettes disponibles")
                //delete client
            }

        };*/

};


var r = new Restaurant();

r.createRecipeB();

