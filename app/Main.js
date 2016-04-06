'use strict';

var marchand = require('./Marchand.js');
var restaurant = require('./Restaurant.js');
var client = require('./Client.js');
const chalk = require('chalk');

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
console.log(chalk.yellow('=========== DAY ' + day + ' ============'));
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
    if (minute % 20 === 0) {
      createClient();
    }
  }

  if (hour > 11 && hour < 14 || hour > 18 && hour <= 23) {
    if (minute % 8 === 0) {
      createClient();
    }
  }

  if (hour == 24) {
    hour = 0;
    day += 1;
    console.log(chalk.yellow('=========== DAY ' + day + ' ==========='));
    if (day == 4) {
      console.log(chalk.yellow('=========== FIN DE LA SIMULATION ============'));
      clearInterval(timer);
      r.scoreIt();
      r.scoreJap();
      r.scoreFr();
    }
  }
  console.log(hour + ':' + minute);
}

//=======OPENING RUNGIS=========

function openRungis() {
  if (hour === OPEN_RUNGIS) {
    m.openingRungis();
  }
  else if (hour === CLOSE_RUNGIS) {
    m.closingRungis();
  }
}


//=======OPENING RESTAURANT=========

function openRes() {
  if (hour == r.getOpenTimeResItalian()) {
      r.openingResItalian();
  }
  else if (r.getOpenTimeResItalian()) {
    if (hour == r.getCloseTimeResItalian()) {
        r.closingResItalian();
    }
  }
  if (hour == r.getOpenTimeResJap()) {
      r.openingResJap();
  }
  else if (r.getOpenTimeResJap()) {
    if (hour == r.getCloseTimeResJap()) {
        r.closingResJap();
    }
  }
  if (hour == r.getOpenTimeResFrench()) {
      r.openingResFrench();
  }
  else if (r.getOpenTimeResFrench()) {
    if (hour == r.getCloseTimeResFrench()) {
        r.closingResFrench();
    }

  }
}

//=======CREATE CLIENTS=========

function createClient() {
  nameClient = new client.Client();
  console.log(chalk.blue('A new client is hungry ! '));
  nameClient.choiceRestaurant(r);
  if (nameClient.getRestauItalianChoice() === true) {
    if (r.getOpenResItalian()) {
      console.log(chalk.green('The restaurant italian is opened ! '));
      nameClient.choiceRecipe(r);
      r.needRefuelingItalian();
      r.scoreIt();
    }
    else {
      console.log(chalk.red('The italian restaurant is closed, wait 10 minutes ! '));
      setTimeout(() => {
        nameClient.choiceRestaurant(r);
        if (nameClient.getRestauItalianChoice() === true) {
          if (r.getOpenResItalian()) {
            console.log(chalk.green('The restaurant italian is opened ! '));
            nameClient.choiceRecipe(r);
            r.needRefuelingItalian();
            r.scoreIt();
          }
          else
            console.log(
              chalk.red('2nd try, the italian restaurant is still closed, seen you soon ! '));
        }
      }, WAIT_TO_ENTER);

    }
  }


  if (nameClient.getRestauJapChoice() === true) {
    if (r.getOpenResJap()) {
      console.log(chalk.green('The restaurant japanese is opened ! '));
      nameClient.choiceRecipe(r);
      r.needRefuelingJap();
      r.scoreJap();
    }
    else {
      console.log(chalk.red('The japanese restaurant is closed, wait 10 minutes ! '));
      setTimeout(() => {
        nameClient.choiceRestaurant(r);
        if (nameClient.getRestauJapChoice() === true) {
          if (r.getOpenResJap()) {
            console.log(chalk.green('The restaurant japanese is opened ! '));
            nameClient.choiceRecipe(r);
            r.needRefuelingJap();
            r.scoreJap();
          }
          else
            console.log(
                chalk.red('2nd try, the japanese restaurant is still closed, seen you soon ! '));
        }
      }, WAIT_TO_ENTER);

    }
  }

  if (nameClient.getRestauFrenchChoice() === true) {
    if (r.getOpenResFrench()) {
      console.log(chalk.green('The restaurant french is opened ! '));
      nameClient.choiceRecipe(r);
      r.needRefuelingFrench();
      r.scoreFr();
    }
    else {
      console.log(chalk.red('The japanese french is closed, wait 10 minutes ! '));
      setTimeout(() => {
        nameClient.choiceRestaurant(r);
        if (nameClient.getRestauFrenchChoice() === true) {
          if (r.getOpenResFrench()) {
            console.log(chalk.green('The restaurant french is opened ! '));
            nameClient.choiceRecipe(r);
            r.needRefuelingFrench();
            r.scoreFr();
          }
          else {
              console.log(
                  chalk.red('2nd try, the french restaurant is still closed, seen you soon ! '));
          }
        }
      }, WAIT_TO_ENTER);

    }
  }
}





