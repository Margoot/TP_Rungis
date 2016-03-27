/**
 * Created by simonthome on 18/03/2016.
 */
'use strict'

const Promise = require('bluebird');
const winston = require('winston');

const HOUR_TO_MIN = 100;

module.exports =  class {
    constructor (){
        this.openTime = 5*HOUR_TO_MIN;
        this.closeTime = 14*HOUR_TO_MIN;
        this.refuelingTime = Math.floor((Math.random() * (HOUR_TO_MIN + 15)) + 15);
        //this.open = false;
        this.stock = [
            "eggs","pasta","bacon","cream","onions","salad","tomatoes","mozarella","chicken","parmesan","sushi","california",
            "maki","brochettes","miso soup","ramen","maki nutella","beef","onion","sauce","riz","bread","potatoes","cheese","ham",
            "carrot"
        ];
    }

    opening () {
        var open = new Promise ((resolve,reject)=>{
            setTimeout(() => {console.log("le marché est ouvert");
                resolve(true)}, 5000);



        });

        open
            .then(() => {this.refueling();
            })
            .catch(err => console.log(`Error : ${err}`));


    }

    closing (open) {

        if (open){
            var close = new Promise ((resolve,reject)=>{
                setTimeout(() => resolve(true), 5000);

            });
        }

        close
            .then(() => {console.log("le marché est fermé")})
            .catch(err => console.log(`Error : ${err}`));



    };

    refueling() {
        var refuel = new Promise ((resolve, reject) => {

            console.log("Début du ravitaillement");
            setTimeout(() => {console.log("fin du ravitaillement");
                resolve(true)},10000);
        });

        refuel
            .then((end) => {this.closing(end);
            })
            .catch(err => console.log(`Error : ${err}`));
    };




}
return module.exports;
