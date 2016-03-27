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
<<<<<<< HEAD
        this.open = false;
=======
        //this.open = false;
>>>>>>> Bébou-le-rourou
        this.stock = [
            "eggs","pasta","bacon","cream","onions","salad","tomatoes","mozarella","chicken","parmesan","sushi","california",
            "maki","brochettes","miso soup","ramen","maki nutella","beef","onion","sauce","riz","bread","potatoes","cheese","ham",
            "carrot"
        ];
    }

    opening () {
        var open = new Promise ((resolve,reject)=>{
            setTimeout(() => {console.log("le marché est ouvert");
                resolve(this.open=true);
                this.refueling();}, this.openTime*10);




        });

        open
            .then(() => {
                this.closing(this.open);
            })
            .catch(err => console.log(`Error : ${err}`));


    }

    closing (open) {

        if (open){
            var close = new Promise ((resolve,reject)=>{
                setTimeout(() => {this.open =false;
                    resolve()}, this.closeTime*10);

            });
        }

        close
            .then(() => {console.log("le marché est fermé")})
            .catch(err => console.log(`Error : ${err}`));



    };

    refueling() {
        if (this.open){
        var refuel = new Promise ((resolve, reject) => {

            console.log("Début du ravitaillement");
            setTimeout(() => {
                resolve();
            }, this.refuelingTime*10);
        });
        }
        else {
            reject();
        }

        refuel
            .then(() => {console.log("Fin du ravitaillement");})
            .catch(err => console.log(`Error : ${err}`));
    };




}

return module.exports;


