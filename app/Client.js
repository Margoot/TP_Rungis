'use strict';

const chalk = require('chalk');
const NB_RESTAURANT = 3;
const NB_RECIPE = 2;

/**
 * class to characterize a client that uses a random restaurant
 * and choose a recipe.
 */
class Client {
  /**
   * restauChoice : random between three restaurants
   * recipeRandom : random between two recipes
   * resistance : the client has a resistance time between 10 and 40 minutes
   */
  constructor() {
    this.restauChoice = Math.floor(Math.random() * NB_RESTAURANT);
    this.recipeRandom = Math.floor(Math.random() * NB_RECIPE);
    this.resistance = Math.floor((Math.random() * 40) + 10);
    this.restauItalianChoice = false;
    this.restauJapChoice = false;
    this.restauFrenchChoice = false;
  }

  /**
   * Getters and setters
   * @returns {boolean}
  */
  getRestauItalianChoice() {
    return this.restauItalianChoice;
  }

  getRestauJapChoice() {
    return this.restauJapChoice;
  }

  getRestauFrenchChoice() {
    return this.restauFrenchChoice;
  }


//==========================================================
//             CHOICE RESTAURANT RANDOMLY
//==========================================================

  /**
   * Function to give the possibility to the client to choose his restaurant.
   * There are 3 restaurants : Italian, Japanese and French
   * @param restaurant
   * Each time we define the stock and the recipes of the chosen restaurant
   */
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
            'We are checking if the italian restaurant is opened.'));
        break;
      case 1 :
        this.stock = restaurant.stockJap;
        this.recipe1 = restaurant.recipe1Jap;
        this.recipe2 = restaurant.recipe2Jap;
        this.restauJapChoice = true;
        console.log(
          chalk.blue(
            'We are checking if the japanese restaurant is opened.'));
        break;
      case 2 :
        this.stock = restaurant.stockFrench;
        this.recipe1 = restaurant.recipe1French;
        this.recipe2 = restaurant.recipe2French;
        this.restauFrenchChoice = true;
        console.log(
          chalk.blue(
            'We are checking if the french restaurant is opened.'));
        break;
      default :
        console.log(chalk.red('Error'));
    }

  }

//==========================================================
//                CHOICE RECIPE RANDOMLY
//==========================================================

  /**
   * Function to choose the recipe. Each restaurant has 2 recipes
   * with its own stock.
   * @param restaurant
   * We use promises to have a link between actions.
   * First, we are checking if the recipe is available,
   * then, we create the recipe
   * finally, we're cooking by using ingredients
   * If the chosen recipe is not available, the catch goes to the other recipe.
   * If the other recipe is not available as well, the client goes away.
   */
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