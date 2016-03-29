/**
 * Created by simonthome on 18/03/2016.
 */
'use strict'

const Promise = require('bluebird');
const winston = require('winston');


const HOUR_TO_MIN = 100;

module.exports = class {
  constructor() {
    this.openTimeRungis = 5 * HOUR_TO_MIN;
    this.closeTimeRungis = 14 * HOUR_TO_MIN;
    this.refuelingTime = Math.floor((Math.random() * (HOUR_TO_MIN + 15)) + 15);
    this.openRungis = false;
    this.stock = [
      "eggs", "pasta", "bacon", "cream", "onions", "salad", "tomatoes",
      "mozarella", "chicken", "parmesan", "sushi", "california",
      "maki", "brochettes", "miso soup", "ramen", "maki nutella", "beef",
      "onion", "sauce", "riz", "bread", "potatoes", "cheese", "ham",
      "carrot"
    ];
  }
  getOpenTimeRungis(){
    return this.openTimeRungis;
  }

  getCloseTimeRungis(){
    return this.closeTimeRungis;
  }

  getOpenRungis(){
    return this.openRungis;
  }

  openingRungis() {
   // var open = new Promise((resolve, reject)=> {
        console.log("le marché est ouvert");
        this.openRungis = true;
        //this.refueling(); //juste pour tester refueling
    //});
    /*open
      .then(() => {
        this.closingRungis(this.openRungis);
      })
      .catch(err => console.log(`Error : ${err}`));*/
  }

  closingRungis() {


          this.openRungis = false;

        console.log("le marché est fermé")

  };


  refueling() {
    if (this.openRungis) {
      var refuel = new Promise((resolve, reject) => {
        console.log("Début du ravitaillement");
        setTimeout(() => {
          resolve();
        }, this.refuelingTime * 10);
      });
    }
    else {
      reject();
    }

    refuel
      .then(() => {
        console.log("Fin du ravitaillement");
      })
      .catch(err => console.log(`Error : ${err}`));
  };

};
return module.exports;