'use strict';
const chalk = require('chalk');
var Promise = require('bluebird');
const MS_FOR_MIN = 10;


class Restaurant {
  constructor() {
    this.openTimeResItalian = 11;
    this.closeTimeResItalian = 16;
    this.openTimeResJap = 8;
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

    this.stockItalian = {
      eggs: 1,
      pasta: 1,
      bacon: 1,
      cream: 1,
      onions: 1,
      salad: 1,
      tomatoes: 1,
      mozarella: 1,
      chicken: 1,
      parmesan: 1
    };
    this.stockJap = {
      sushi: 1,
      california: 1,
      maki: 1,
      brochettes: 1,
      miso_soup: 1,
      ramen: 1,
      maki_nutella: 1
    };
    this.stockFrench = {
      beef: 1,
      sauce: 1,
      rice: 1,
      bread: 1,
      potatoes: 1,
      cheese: 1,
      ham: 1,
      carrot: 1
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
      miso_soup: 1,
      ramen: 1,
      maki_nutella: 1
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

  getOpenResItalian() {
    return this.openResItalian;
  }

  getOpenResJap() {
    return this.openResJap;
  }

  getOpenResFrench() {
    return this.openResFrench;
  }


  //=====OPENING/CLOSING RESTAURANT=======

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
      if (numIng === Object.keys(recipe).length)
        resolve();
      else
        reject();
    });
  }

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

  cook(resistance) {
    var cookTime = Math.floor((Math.random() * 50) + 5);
    setTimeout(()=> {
      if (cookTime > resistance) {
        console.log(
          chalk.red(
            'I already wait ' + resistance + ' minutes, that\'s too long !'));
      }
      else {
        console.log(
          chalk.green('Your meal is ready !! (cookTime' + cookTime + ')'));
        if (cookTime < (resistance - 10))
          this.scoreCase = 2;
        else
          this.scoreCase = 1;
      }
    }, cookTime * MS_FOR_MIN);
  }

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
      if (numIng === Object.keys(recipe).length)
        resolve();
      else
        reject();
    });
  }

  //====== REFUELING ========

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
        console.log(chalk.cyan('The italian restaurant done is refueling in ' +
          refuelingTime + ' minutes'));
      }, refuelingTime * MS_FOR_MIN);
      this.emptyStock = 0;
    }

  }

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
        console.log(chalk.cyan('The japanese restaurant done is refueling in ' +
          refuelingTime + ' minutes'));
      }, refuelingTime * MS_FOR_MIN);
      this.emptyStock = 0;
    }
  }

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
        console.log(chalk.cyan('The french restaurant done is refueling in ' +
          refuelingTime + ' minutes'));
      }, refuelingTime * MS_FOR_MIN);
      this.emptyStock = 0;
    }
  }

  scoreIt() {
    switch (this.scoreCase) {
      case 1 :
        this.italianScore = this.italianScore + 1;
        break;
      case 2 :
        this.italianScore = this.italianScore + 2;
        break;
    }
    console.log(chalk.gray('ITALIAN RESTAURANT SCORE : ' +
      (this.italianScore * this.closeTimeResItalian)));
    var scoreHtml = this.frenchScore * this.closeTimeResFrench;
    //document.getElementById('score_it_output').innerHTML = (scoreHtml.toString());
  }

  scoreJap() {
    switch (this.scoreCase) {
      case 1 :
        this.japScore = this.japScore + 1;
        break;
      case 2 :
        this.japScore = this.japScore + 2;
        break;
    }
    console.log(chalk.gray('JAPANESE RESTAURANT SCORE : ' +
      (this.japScore * this.closeTimeResJap)));
    var scoreHtml = this.frenchScore * this.closeTimeResFrench;
    // document.getElementById('score_jp_output').innerHTML = (scoreHtml.toString());
  }

  scoreFr() {
    switch (this.scoreCase) {
      case 1 :
        this.frenchScore = this.frenchScore + 1;
        break;
      case 2 :
        this.frenchScore = this.frenchScore + 2;
        break;
    }
    console.log(chalk.gray('FRENCH RESTAURANT SCORE : ' +
      (this.frenchScore * this.closeTimeResFrench)));
    var scoreHtml = this.frenchScore * this.closeTimeResFrench;
    //document.getElementById('score_fr_output').innerHTML = (scoreHtml.toString());
  }
}
module.exports.Restaurant = Restaurant;
