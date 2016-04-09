'use strict';

var marchand = require('./Marchand.js');
var restaurant = require('./Restaurant.js');
var client = require('./Client.js');
const chalk = require('chalk');
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();


const OPEN_RUNGIS = 5;
const CLOSE_RUNGIS = 14;
const WAIT_TO_ENTER = 10;
const MS_FOR_MIN = 10;

var r = new restaurant.Restaurant();
var m = new marchand.Marchand();
var nbClientFr = 0;
var nbClientIt = 0;
var nbClientJap = 0;


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
    event.emit('hour');

  }

  if (hour >= 0 && hour <= 11 || hour >= 14 && hour <= 18) {
    if (minute % 20 === 0) {
      event.emit('minute');

    }
  }

  if (hour > 11 && hour < 14 || hour > 18 && hour <= 23) {
    if (minute % 8 === 0) {
      event.emit('minute2');

    }
  }

  if (hour == 24) {
    hour = 0;
    day += 1;
    console.log(chalk.yellow('=========== DAY ' + day + ' ==========='));
    if (day == 4) {
      console.log(
        chalk.yellow('=========== FIN DE LA SIMULATION ============'));
      clearInterval(timer);
      event.emit('day');

    }
  }
  //var clockHtml = document.getElementById('clock');
  //clockHtml.innerHTML = (hour + 'h' + minute +'min');
  console.log(hour + ':' + minute);
}


event.on('hour', () => {
  openRungis();
});
event.on('hour', () => {
  openRes();
});
event.on('minute', () => {
  createClient();
});
event.on('minute2', () => {
  createClient();
});
event.on('day', () => {
  r.scoreIt();
});
event.on('day', () => {
  r.scoreJap();
});
event.on('day', () => {
  r.scoreFr();
});

//=======OPENING RUNGIS=========

function openRungis() {
  if (hour === OPEN_RUNGIS) {
    m.openingRungis();
    //document.getElementById('rungis_open_close').style.backgroundColor = '#2AAA00';
  }
  else if (hour === CLOSE_RUNGIS) {
    m.closingRungis();
    //document.getElementById('rungis_open_close').style.backgroundColor = '#F01802';


  }
}


//=======OPENING RESTAURANT=========

function openRes() {
  if (hour == r.getOpenTimeResItalian()) {
    r.openingResItalian();

    //document.getElementById('open_close_it').innerHTML = ('OPEN');

  }
  else if (r.getOpenTimeResItalian()) {
    if (hour == r.getCloseTimeResItalian()) {
      r.closingResItalian();

      //document.getElementById('open_close_it').innerHTML = ('OPEN');
    }
  }
  if (hour == r.getOpenTimeResJap()) {
    r.openingResJap();

    //document.getElementById('open_close_jp').innerHTML = ('OPEN');
  }
  else if (r.getOpenTimeResJap()) {
    if (hour == r.getCloseTimeResJap()) {
      r.closingResJap();

      //document.getElementById('open_close_jp').innerHTML = ('CLOSE');

    }
  }
  if (hour == r.getOpenTimeResFrench()) {
    r.openingResFrench();

    //document.getElementById('open_close_fr').innerHTML = ('OPEN');
  }
  else if (r.getOpenTimeResFrench()) {
    if (hour == r.getCloseTimeResFrench()) {
      r.closingResFrench();

      //document.getElementById('open_close_fr').innerHTML = ('CLOSE');
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
      nbClientIt++;
      //document.getElementById('client_it_output').innerHTML = (nbClientIt.toString());


    }
    else {
      console.log(
        chalk.red('The italian restaurant is closed, wait 10 minutes ! '));
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
              chalk.red(
                '2nd try, the italian restaurant is still closed, seen you soon ! '));
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
      nbClientJap++;
      //document.getElementById('client_jp_output').innerHTML = (nbClientJap.toString());
    }
    else {
      console.log(
        chalk.red('The japanese restaurant is closed, wait 10 minutes ! '));
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
              chalk.red(
                '2nd try, the japanese restaurant is still closed, seen you soon ! '));
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
      nbClientFr++;
      //document.getElementById('client_fr_output').innerHTML = (nbClientFr.toString());

    }
    else {
      console.log(
        chalk.red('The japanese french is closed, wait 10 minutes ! '));
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
              chalk.red(
                '2nd try, the french restaurant is still closed, seen you soon ! '));
          }
        }
      }, WAIT_TO_ENTER);

    }
  }
}





