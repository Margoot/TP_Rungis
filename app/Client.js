'use strict';

const chalk = require('chalk');
const NB_RESTAURANT = 3;
const NB_RECIPE = 2;

class Client {
  constructor() {
    this.restauChoice = Math.floor(Math.random() * NB_RESTAURANT);
    this.recipeRandom = Math.floor(Math.random() * NB_RECIPE);
    this.resistance = Math.floor((Math.random() * 40) + 10);
    this.restauItalianChoice = false;
    this.restauJapChoice = false;
    this.restauFrenchChoice = false;
  }

  getRestauItalianChoice() {
    return this.restauItalianChoice;
  }

  getRestauJapChoice() {
    return this.restauJapChoice;
  }

  getRestauFrenchChoice() {
    return this.restauFrenchChoice;
  }

  choiceRestaurant(restaurant) {
    console.log(chalk.blue('The client has chosen the restaurant ! '));
    switch (this.restauChoice) {
      case 0 :
        this.stock = restaurant.stockItalian;
        this.recipe1 = restaurant.recipe1Italian;
        this.recipe2 = restaurant.recipe2Italian;
        this.restauItalianChoice = true;
        console.log(
          chalk.blue(
            'We are checking the if the italian restaurant is opened.'));

        break;
      case 1 :
        this.stock = restaurant.stockJap;
        this.recipe1 = restaurant.recipe1Jap;
        this.recipe2 = restaurant.recipe2Jap;
        this.restauJapChoice = true;
        console.log(
          chalk.blue(
            'We are checking the if the japanese restaurant is opened.'));
        break;
      case 2 :
        this.stock = restaurant.stockFrench;
        this.recipe1 = restaurant.recipe1French;
        this.recipe2 = restaurant.recipe2French;
        this.restauFrenchChoice = true;
        console.log(
          chalk.blue(
            'We are checking the if the french restaurant is opened.'));
        break;
      default :
        console.log(chalk.red('Error'));
    }

  }

  choiceRecipe(restaurant) {
    switch (this.recipeRandom) {
      case 0 :
        console.log(
          chalk.blue('We are checking if your recipe can be cooked ! '));
        restaurant.createRecipe1(this.stock, this.recipe1)
          .then(() => {
            console.log(chalk.green('We are cooking your meal : '));
            console.log(this.recipe1);
            restaurant.useIngredients(this.stock, this.recipe1);
            restaurant.cook(this.resistance);
          })
          .catch(() => {
            restaurant.createRecipe2(this.stock, this.recipe2)
              .then(() => {
                console.log(
                  chalk.green('We are cooking your meal : '));
                console.log(this.recipe2);
                restaurant.useIngredients(this.stock, this.recipe2);
                restaurant.cook(this.resistance);
              })
              .catch(() => {
                console.log(
                  chalk.red('No available recipe, sorry ! '));
              });
          });
        break;
      case 1 :
        console.log(
          chalk.blue('We are checking if your recipe can be cooked ! '));
        restaurant.createRecipe2(this.stock, this.recipe2)
          .then(() => {
            console.log(chalk.green('We are cooking your meal : '));
            console.log(this.recipe2);
            restaurant.useIngredients(this.stock, this.recipe2);
            restaurant.cook(this.resistance);
          })
          .catch(() => {
            restaurant.createRecipe1(this.stock, this.recipe1)
              .then(() => {
                console.log(
                  chalk.green('We are cooking your meal : '));
                console.log(this.recipe1);
                restaurant.useIngredients(this.stock, this.recipe1);
                restaurant.cook(this.resistance);
              })
              .catch(
                () => console.log(
                  chalk.red('No available recipe, sorry ! ')));
          });
        break;
    }
  }
}
module.exports.Client = Client;