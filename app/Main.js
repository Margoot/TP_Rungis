'use strict';

var marchand = require('./Marchand.js');
var restaurant = require('./Restaurant.js');
var client = require('./Client.js');

var Promise = require('bluebird');

const OPEN_RUNGIS = 5;
const CLOSE_RUNGIS = 14;
const WAIT_TO_ENTER = 10;
const MS_FOR_MIN = 1;

var r = new restaurant.Restaurant();
var m = new marchand.Marchand();


//  ======= HORLOGE =======

var hour = 0;
var minute = 0;
var day = 1;
var nameClient = Math.floor((Math.random() * 1000000));
console.log("=========== DAY " + day + " ============");
var timer = setInterval(clock, MS_FOR_MIN);

function clock() {

  minute += 1;

  if (minute > 59) {
    minute = 0;
    hour += 1;
    openRungis();
    openRes();
  }

  if (hour >= 0 && hour <= 11 || hour >= 14 && hour <= 18) {
    if (minute % 20 == 0)
      createClient();
  }

  if (hour > 11 && hour < 14 || hour > 18 && hour <= 23) {
    if (minute % 8 == 0)
      createClient();
  }

  if (hour == 24) {
    hour = 0;
    day += 1;
    console.log("=========== DAY " + day + " ===========");
    if (day == 4) {
      console.log("FIN DE LA SIMULATION");
      clearInterval(this);
      r.scoreIt();
      r.scoreJap();
      r.scoreFr();
    }
  }
  console.log(hour + ":" + minute);
}

//=======OPENING RUNGIS=========

function openRungis() {
  if (hour === OPEN_RUNGIS)
    m.openingRungis();
  else if (hour === CLOSE_RUNGIS)
    m.closingRungis();
}


//=======OPENING RESTAURANT=========

function openRes() {
  if (hour == r.getOpenTimeResItalian())
    r.openingResItalian();
  else if (r.getOpenTimeResItalian()) {
    if (hour == r.getCloseTimeResItalian())
      r.closingResItalian();
  }
  if (hour == r.getOpenTimeResJap())
    r.openingResJap();
  else if (r.getOpenTimeResJap()) {
    if (hour == r.getCloseTimeResJap())
      r.closingResJap();
  }
  if (hour == r.getOpenTimeResFrench())
    r.openingResFrench();
  else if (r.getOpenTimeResFrench()) {
    if (hour == r.getCloseTimeResFrench())
      r.closingResFrench();
  }
}

//=======CREATE CLIENTS=========

function createClient() {
  nameClient = new client.Client();
  console.log("un nouveau client à faim");
  nameClient.choiceRestaurant(r);
  if (nameClient.getRestauItalianChoice() == true) {
    if (r.getOpenResItalian()) {
      console.log("le restaurant Italien est ouvert");
      nameClient.choiceRecipe(r);
      r.needRefuelingItalian();
      r.scoreIt();
    }
    else {
      console.log("le restaurant italien est fermé, attendez 10 min ")
      setTimeout(() => {
        nameClient.choiceRestaurant(r);
        if (nameClient.getRestauItalianChoice() == true) {
          if (r.getOpenResItalian()) {
            console.log("le restaurant Italien est ouvert");
            nameClient.choiceRecipe(r);
            r.needRefuelingItalian();
            r.scoreIt();
          }
          else
            console.log(
              "le restaurant Italien est fermé au bout du 2eme essai, au revoir");
        }
      }, WAIT_TO_ENTER);

    }
  }


  if (nameClient.getRestauJapChoice() == true) {
    if (r.getOpenResJap()) {
      console.log("le restaurant Japonais est ouvert");
      nameClient.choiceRecipe(r);
      r.needRefuelingJap();
      r.scoreJap();
    }
    else {
      console.log("le restaurant Japonais est fermé, attendez 10 min ")
      setTimeout(() => {
        nameClient.choiceRestaurant(r);
        if (nameClient.getRestauJapChoice() == true) {
          if (r.getOpenResJap()) {
            console.log("le restaurant Japonais est ouvert");
            nameClient.choiceRecipe(r);
            r.needRefuelingJap();
            r.scoreJap();
          }
          else
            console.log(
              "le restaurant Japonais est fermé au bout du 2eme essai, au revoir");
        }
      }, WAIT_TO_ENTER);

    }
  }

  if (nameClient.getRestauFrenchChoice() == true) {
    if (r.getOpenResFrench()) {
      console.log("le restaurant Français est ouvert");
      nameClient.choiceRecipe(r);
      r.needRefuelingFrench();
      r.scoreFr();
    }
    else {
      console.log("le restaurant Français est fermé, attendez 10 min ")
      setTimeout(() => {
        nameClient.choiceRestaurant(r);
        if (nameClient.getRestauFrenchChoice() == true) {
          if (r.getOpenResFrench()) {
            console.log("le restaurant Français est ouvert");
            nameClient.choiceRecipe(r);
            r.needRefuelingFrench();
            r.scoreFr();
          }
          else
            console.log(
              "le restaurant Français est fermé au bout du 2eme essai, au revoir");
        }
      }, WAIT_TO_ENTER);

    }
  }
}





