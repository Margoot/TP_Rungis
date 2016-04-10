'use strict';

var market = require('./Market.js');
var restaurant = require('./Restaurant.js');
var client = require('./Client.js');
const chalk = require('chalk');
const grunt = require('grunt');


const OPEN_RUNGIS = 5;
const CLOSE_RUNGIS = 14;
const WAIT_TO_ENTER = 10;
const MS_FOR_MIN = 100;

/**
 * instantiation of a new Market
 * @type {*|Market}
 */
var m = new market.Market();
/**
 * instantiation of a new Restaurant
 * @type {*|Restaurant}
 */
var r = new restaurant.Restaurant();
/**
 * only use to have the number of clients in the display (electron)
 * @type {number}
 */
var nbClientFr = 0;
var nbClientIt = 0;
var nbClientJap = 0;

//==========================================================
//                      HORLOGE
//==========================================================

var hour = 0;
var minute = 0;
var day = 1;
/**
 * the name of a new client is genereted randomly
 * @type {number}
 */
var nameClient = Math.floor((Math.random() * 1000000));
console.log(chalk.yellow('=========== DAY ' + day + ' ============'));
/**
 * setInterval to have the clock every second
 * @type {number|Object}
 */
var timer = setInterval(clock, MS_FOR_MIN);

/**
 * function to create minutes, hours and days
 * events are emitted directly in this function
 */
function clock() {

  minute += 1;

  if (minute > 59) {
    minute = 0;
    hour += 1;
    grunt.event.emit('hour');
  }

  /**
   * off-peak hour
   * during this time the clients creation is rare
   */
  if (hour >= 0 && hour <= 11 || hour >= 14 && hour <= 18) {
    if (minute % 20 === 0) {
      grunt.event.emit('minute');

    }
  }

  /**
   * rush hour
   * during this time a client is created often enough
   */
  if (hour > 11 && hour < 14 || hour > 18 && hour <= 23) {
    if (minute % 8 === 0) {
      grunt.event.emit('minute2');

    }
  }

  if (hour == 24) {
    hour = 0;
    day += 1;
    if (day <= 3) {
      console.log(chalk.yellow('=========== DAY ' + day + ' ==========='));
    } else {
      console.log(
        chalk.yellow('=========== FIN DE LA SIMULATION ============'));
      clearInterval(timer);
      grunt.event.emit('day');

    }
  }
  console.log(hour + ':' + minute);

  //-------ELECTRION-------
  //var clockHtml = document.getElementById('clock');
  //clockHtml.innerHTML = (hour + 'h' + minute + 'min');
  //-----------------------
}

//==========================================================

/**
 * events to open the market, open the restaurants,
 * create clients and display the score
 */
grunt.event.on('hour', () => {
  openRungis();
});
grunt.event.on('hour', () => {
  openRes();
});
grunt.event.on('minute', () => {
  createClient();
});
grunt.event.on('minute2', () => {
  createClient();
});
grunt.event.on('day', () => {
  r.scoreIt();
});
grunt.event.on('day', () => {
  r.scoreJap();
});
grunt.event.on('day', () => {
  r.scoreFr();
});

//==========================================================
//            OPENING/CLOSING RUNGIS MARKET
//==========================================================

/**
 * function to open and close the Rungis market
 */
function openRungis() {
  if (hour === OPEN_RUNGIS) {
    m.openingRungis();

    //-------ELECTRION-------
    //document.getElementById('rungis_open_close')
     //.style.backgroundColor = '#5ACE98';
    //-----------------------

  } else if (hour === CLOSE_RUNGIS) {
    m.closingRungis();

    //-------ELECTRION-------
    //document.getElementById('rungis_open_close')
    //.style.backgroundColor = '#E9626B';
    //-----------------------
  }
}


//==========================================================
//                OPENING RESTAURANT
//==========================================================

/**
 * function to open each restaurant
 * If the restaurant is not open, it can't be close.
 */
function openRes() {
  if (hour == r.getOpenTimeResItalian()) {
    r.openingResItalian();

    //-------ELECTRION-------
    //document.getElementById('open_close_it').innerHTML = ('OPEN');
    //-----------------------

  } else if (r.getOpenTimeResItalian()) {
    if (hour == r.getCloseTimeResItalian()) {
      r.closingResItalian();

      //-------ELECTRION-------
      //document.getElementById('open_close_it').innerHTML = ('CLOSE');
      //-----------------------
    }
  }
  if (hour == r.getOpenTimeResJap()) {
    r.openingResJap();

    //-------ELECTRION-------
    //document.getElementById('open_close_jp').innerHTML = ('OPEN');
    //-----------------------

  } else if (r.getOpenTimeResJap()) {
    if (hour == r.getCloseTimeResJap()) {
      r.closingResJap();

      //-------ELECTRION-------
      //document.getElementById('open_close_jp').innerHTML = ('CLOSE');
      //-----------------------

    }
  }
  if (hour == r.getOpenTimeResFrench()) {
    r.openingResFrench();

    //-------ELECTRION-------
    //document.getElementById('open_close_fr').innerHTML = ('OPEN');
    //-----------------------

  } else if (r.getOpenTimeResFrench()) {
    if (hour == r.getCloseTimeResFrench()) {
      r.closingResFrench();

      //-------ELECTRION-------
      //document.getElementById('open_close_fr').innerHTML = ('CLOSE');
      //-----------------------
    }

  }
}

//==========================================================
//                CREATE CLIENTS
//==========================================================


/**
 * function to create a client which has a name randomly
 * If the chosen restaurant is open, the client chose a recipe.
 * If the restaurant need to refuel, the needRefueling'Restaurant' is called
 * The score is displayed after each client has eaten
 * If the restaurant is closed, the client must be wait 10 minutes after
 * choosing another restaurant
 * If the second restaurant is also closed, the unlucky client goes away
 * This function is repeated for each restaurant
 */

//=====Italian Restaurant=====

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

      //-------ELECTRION-------
      //document.getElementById('client_it_output')
      //.innerHTML = (nbClientIt.toString());
      //-----------------------


    } else {
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

          } else {
            console.log(
              chalk.red(
                '2nd try, the italian restaurant is still closed,' +
                ' seen you soon ! '));
          }
        }
      }, WAIT_TO_ENTER * MS_FOR_MIN);

    }
  }

  //=====Japanese Restaurant=====

  if (nameClient.getRestauJapChoice() === true) {
    if (r.getOpenResJap()) {
      console.log(chalk.green('The restaurant japanese is opened ! '));
      nameClient.choiceRecipe(r);
      r.needRefuelingJap();
      r.scoreJap();
      nbClientJap++;

      //-------ELECTRION-------
      //document.getElementById('client_jp_output')
      //.innerHTML = (nbClientJap.toString());
      //-----------------------

    } else {
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

          } else {
            console.log(
              chalk.red(
                '2nd try, the japanese restaurant ' +
                'is still closed, seen you soon ! '));
          }
        }
      }, WAIT_TO_ENTER * MS_FOR_MIN);

    }
  }

  //=====French Restaurant=====

  if (nameClient.getRestauFrenchChoice() === true) {
    if (r.getOpenResFrench()) {
      console.log(chalk.green('The restaurant french is opened ! '));
      nameClient.choiceRecipe(r);
      r.needRefuelingFrench();
      r.scoreFr();
      nbClientFr++;

      //-------ELECTRION-------
      //document.getElementById('client_fr_output')
      //.innerHTML = (nbClientFr.toString());
      //-----------------------


    } else {
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

          } else {
            console.log(
              chalk.red(
                '2nd try, the french restaurant ' +
                'is still closed, seen you soon ! '));
          }
        }
      }, WAIT_TO_ENTER * MS_FOR_MIN);

    }
  }
}





