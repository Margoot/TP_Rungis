/**
 * Created by simonthome on 18/03/2016.
 */
'use strict';

const Promises = require ('bluebird');

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

        this.recetteA = {
            "eggs": 2,
            "pasta": 2,
            "bacon": 2,
            "creme": 2,
            "onions": 2
        };

        this.recetteB = {
            "salad": 2,
            "tomatoes": 2,
            "mozarella": 2,
            "chicken": 2,
            "parmesan": 2
        };

    }

        createRecetteA() {
            console.log(this.recetteA[1]);
            var dispoRecette = true;
            for (var i = 0; i < this.recetteA.length; i++) {
                if (this.stock[i] >= this.recetteA[i])
                    console.log("ok");
                else
                    dispoRecette = false;
            }
            if (dispoRecette) {
                for (var i = 0; i < this.recetteA.length; i++)
                    this.stock[i] -= 1;
            }
            else
                this.createRecetteB();

        }

        createRecetteB() {
            var dispoRecette = true;
            for (var i = 4; i < this.recetteB.length; i++) {
                if (this.stock[i] >= this.recetteB[i])
                    console.log("ok");
                else
                    dispoRecette = false;
            }
            if (dispoRecette) {
                for (var i = 4; i < this.recetteB.length; i++)
                    this.stock[i] -= 1;
            }
            else {
                console.log("il n'y a plus de recette disponible, bye bye");
                //delete le client;
            }

        }

}

var r = new Restaurant();
r.createRecetteA();
r.createRecetteB();

