'use strict';
const chalk = require('chalk');
var Promise = require('bluebird');
const MS_FOR_MIN = 100;

/**
 * class to define the simulation of a restaurant:
 * fills and checks its stocks, cooks recipes, ...
 */
class Restaurant {
  /**
   * Each restaurant has its own fixed hours,
   * its own score,
   * its own stock and recipes
   */
  constructor() {
    this.openTimeResItalian = 11;
    this.closeTimeResItalian = 16;
    this.openTimeResJap = 4;
    this.closeTimeResJap = 19;
    this.openTimeResFrench = 10;
    this.closeTimeResFrench = 23;
    this.emptyStock = 0;
    this.openResItalian = false;
    this.openResJap = false;
    this.openResFrench = false;
    this.italianScore = 0;
    this.japScore = 0;
    this.frenchScore = 0;

    //==========================================================
    //               STOCKS AND RECIPES
    //==========================================================

    this.stockItalian = {
      eggs: 5,
      pasta: 5,
      bacon: 8,
      cream: 5,
      onions: 6,
      salad: 8,
      tomatoes: 4,
      mozarella: 9,
      chicken: 4,
      parmesan: 6
    };
    this.stockJap = {
      sushi: 4,
      california: 7,
      maki: 3,
      brochettes: 6,
      misoSoup: 5,
      ramen: 4,
      makiNutella: 3
    };
    this.stockFrench = {
      beef: 4,
      sauce: 5,
      rice: 3,
      bread: 5,
      potatoes: 6,
      cheese: 8,
      ham: 9,
      carrot: 8
    };
    this.recipe1Italian = {
      eggs: 1,
      pasta: 1,
      bacon: 1,
      cream: 1,
      onions: 1
    };
    this.recipe2Italian = {
      salad: 1,
      tomatoes: 1,
      mozarella: 1,
      chicken: 1,
      parmesan: 1
    };
    this.recipe1Jap = {
      sushi: 1,
      california: 1,
      maki: 1,
      brochettes: 1
    };
    this.recipe2Jap = {
      misoSoup: 1,
      ramen: 1,
      makiNutella: 1
    };
    this.recipe1French = {
      beef: 1,
      sauce: 1,
      rice: 1,
      bread: 1
    };
    this.recipe2French = {
      potatoes: 1,
      cheese: 1,
      ham: 1,
      carrot: 1
    };
  }

  /**
   * getters and setters to have opening and closing time
   * @returns {number}
   */
  getOpenTimeResItalian() {
    return this.openTimeResItalian;
  }

  getCloseTimeResItalian() {
    return this.closeTimeResItalian;
  }

  getOpenTimeResJap() {
    return this.openTimeResJap;
  }

  getCloseTimeResJap() {
    return this.closeTimeResJap;
  }

  getOpenTimeResFrench() {
    return this.openTimeResFrench;
  }

  getCloseTimeResFrench() {
    return this.closeTimeResFrench;
  }

  /**
   * getters and setters to know if the restaurant is open
   * @returns {boolean}
   */
  getOpenResItalian() {
    return this.openResItalian;
  }

  getOpenResJap() {
    return this.openResJap;
  }

  getOpenResFrench() {
    return this.openResFrench;
  }


  /**
   * function to open or close restaurant
   */
  openingResItalian() {
    this.openResItalian = true;
    console.log(chalk.green('The italian restaurant is opened ! '));
  }

  closingResItalian() {
    this.openResItalian = false;
    console.log(chalk.red('The italian restaurant is closed'));
  }

  openingResJap() {
    this.openResJap = true;
    console.log(chalk.green('The japanese restaurant is opened ! '));
  }

  closingResJap() {
    this.openResJap = false;
    console.log(chalk.red('The japanese restaurant is closed'));
  }

  openingResFrench() {
    this.openResFrench = true;
    console.log(chalk.green('The french restaurant is opened ! '));
  }

  closingResFrench() {
    this.openResFrench = false;
    console.log(chalk.red('The french restaurant is closed'));
  }

  //==========================================================
  //                CREATE RECIPES
  //==========================================================

  /**
   * function to create the recipe 1 which has been chosen randomly.
   * Each key of the stock is checked. If the key is superior than zero,
   * the number of ingredients increments
   * If the number of ingredients is equal to the number of ingredients
   * needed to create the recipe, the promise
   * is resolved. Otherwise , the promise is rejected.
   *
   * @param stock
   * @param recipe
   * @returns {bluebird|exports|module.exports}
   */
  createRecipe1(stock, recipe) {
    return new Promise((resolve, reject) => {
      var numIng = 0;
      console.log(recipe);
      for (var i in recipe) {
        if (recipe.hasOwnProperty(i)) {
          for (var j in stock) {
            if (i === j && stock.hasOwnProperty(j)) {
              if (stock[j] > 0) {
                numIng++;
              }
            }
          }
        }
      }
      if (numIng === Object.keys(recipe).length) {
        resolve();
      } else {
        reject();
      }
    });
  }

  /**
   * the same function like above but for the recipe2
   * @param stock
   * @param recipe
   * @returns {bluebird|exports|module.exports}
   */
  createRecipe2(stock, recipe) {
    return new Promise((resolve, reject) => {
      var numIng = 0;
      console.log(recipe);
      for (var i in recipe) {
        if (recipe.hasOwnProperty(i)) {
          for (var j in stock) {
            if (i === j && stock.hasOwnProperty(j)) {
              if (stock[j] > 0) {

                numIng++;
              }
            }
          }
        }
      }
      if (numIng === Object.keys(recipe).length) {
        resolve();
      } else {
        reject();
      }
    });
  }

  //==========================================================
  //                STOCK DECREMENTATION
  //==========================================================

  /**
   * function to decrement of one unit each ingredient in the stock
   * according to the recipe created.
   * @param stock
   * @param recipe
   */
  useIngredients(stock, recipe) {
    console.log(chalk.magenta('New stock after consumption : '));
    for (var i in recipe) {
      if (recipe.hasOwnProperty(i)) {
        for (var j in stock) {
          if (i === j && stock.hasOwnProperty(j)) {
            stock[j]--;
          }
        }
      }
    }
    console.log(stock);
  }

//==========================================================
//                       COOKING
//==========================================================

  /**
   * function to prepare the meal during a randomly cooktime
   * between 5 and 50 minutes.
   * Each client has a resistance time. If this time is superior
   * than the cooktime, the client is unhappy and he leaves.
   * If the meal is ready 10 minutes before the resistance time of
   * the client, he wins 2 points. Otherwise, 1 point.
   * The score remains zero if the client goes away.
   * The score is stored in a variable (scoreCase)
   * @param resistance
   */
  cook(resistance) {
    var cookTime = Math.floor((Math.random() * 50) + 5);
    setTimeout(()=> {
      if (cookTime > resistance) {
        console.log(
          chalk.red(
            'I already wait ' + resistance + ' minutes, that\'s too long !'));
      } else {
        console.log(
          chalk.green(
            'Your meal is ready !! (cookTime: ' + cookTime + ' min)'));
        if (cookTime < (resistance - 10)) {
          this.scoreCase = 2;
        } else {
          this.scoreCase = 1;
        }
      }
    }, cookTime * MS_FOR_MIN);
  }

//==========================================================
//                     REFUELING
//==========================================================

  /**
   * function to detect if the restaurant needs to refuel its stocks.
   * when a key is equal to zero in the stock, the variable emptyStock
   * increments.
   * If emptyStock is equal or superior than 4, the restaurant fill
   * its stocks with 20 units of each ingredient.
   * This refueling lasts a random time between 15 minutes and 1h15
   * This function is repeated for each restaurant.
   */

  //=====Italian Restaurant=====

  needRefuelingItalian() {
    var refuelingTime =
      Math.floor((60 * Math.random()) + 15);
    for (var i in this.stockItalian) {
      if (this.stockItalian[i] === 0 && this.stockItalian.hasOwnProperty(i)) {
        this.emptyStock++;
      }
    }
    if (this.emptyStock >= 4) {
      console.log(
        chalk.cyan('The italian restaurant is going to Rungis Market ! '));
      setTimeout(() => {
        for (var i in this.stockItalian) {
          if (this.stockItalian.hasOwnProperty(i)) {
            this.stockItalian[i] = 20;
          }
        }
        console.log(chalk.cyan('The italian restaurant is done refueling in ' +
          refuelingTime + ' minutes'));
      }, refuelingTime * MS_FOR_MIN);
      this.emptyStock = 0;
    }

  }

  //=====Japanese Restaurant=====

  needRefuelingJap() {
    var refuelingTime =
      Math.floor((60 * Math.random()) + 15);
    for (var i in this.stockJap) {
      if (this.stockJap[i] === 0) {
        this.emptyStock++;
      }
    }
    if (this.emptyStock >= 4) {
      console.log(
        chalk.cyan('The japanese restaurant is going to Rungis Market ! '));
      setTimeout(() => {
        for (var i in this.stockJap) {
          if (this.stockJap.hasOwnProperty(i)) {
            this.stockJap[i] = 20;
          }
        }
        console.log(chalk.cyan('The japanese restaurant is done refueling in ' +
          refuelingTime + ' minutes'));
      }, refuelingTime * MS_FOR_MIN);
      this.emptyStock = 0;
    }
  }


  //=====French Restaurant=====

  needRefuelingFrench() {
    var refuelingTime =
      Math.floor((60 * Math.random()) + 15);
    for (var i in this.stockFrench) {
      if (this.stockFrench[i] === 0) {
        this.emptyStock++;
      }
    }
    if (this.emptyStock >= 4) {
      console.log(
        chalk.cyan('The french restaurant is going to Rungis Market ! '));
      setTimeout(() => {
        for (var i in this.stockFrench) {
          if (this.stockFrench.hasOwnProperty(i)) {
            this.stockFrench[i] = 20;
          }
        }
        console.log(chalk.cyan('The french restaurant is done refueling in ' +
          refuelingTime + ' minutes'));
      }, refuelingTime * MS_FOR_MIN);
      this.emptyStock = 0;
    }
  }

  //==========================================================
  //                      SCORE
  //==========================================================

  /**
   * function to update and display the score of each restaurant.
   * we use the variable scoreCase set in the cook function.
   */

  //=====Italian Restaurant=====

  scoreIt() {
    switch (this.scoreCase) {
      case 1 :
        this.italianScore = this.italianScore + 1;
        break;
      case 2 :
        this.italianScore = this.italianScore + 2;
        break;
    }
    console.log(chalk.bold('ITALIAN RESTAURANT SCORE : ' +
      (this.italianScore * this.closeTimeResItalian)));

    //-------ELECTRION-------
    //var scoreHtml = this.frenchScore * this.closeTimeResFrench;
    //document.getElementById('score_it_output').innerHTML =
    //(scoreHtml.toString());
    //-----------------------
  }

  //=====Japanese Restaurant=====

  scoreJap() {
    switch (this.scoreCase) {
      case 1 :
        this.japScore = this.japScore + 1;
        break;
      case 2 :
        this.japScore = this.japScore + 2;
        break;
    }
    console.log(chalk.bold('JAPANESE RESTAURANT SCORE : ' +
      (this.japScore * this.closeTimeResJap)));

    //-------ELECTRION-------
    //var scoreHtml = this.frenchScore * this.closeTimeResJap;
    //document.getElementById('score_jp_output').innerHTML =
    //(scoreHtml.toString());
    //-----------------------
  }


  //=====French Restaurant=====

  scoreFr() {
    switch (this.scoreCase) {
      case 1 :
        this.frenchScore = this.frenchScore + 1;
        break;
      case 2 :
        this.frenchScore = this.frenchScore + 2;
        break;
    }
    console.log(chalk.bold('FRENCH RESTAURANT SCORE : ' +
      (this.frenchScore * this.closeTimeResFrench)));

    //-------ELECTRION-------
    //var scoreHtml = this.frenchScore * this.closeTimeResFrench;
    //document.getElementById('score_fr_output').innerHTML =
    //(scoreHtml.toString());
    //-----------------------
  }
}
module.exports.Restaurant = Restaurant;
