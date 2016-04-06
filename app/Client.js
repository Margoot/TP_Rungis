'use strict';


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
    console.log('le client va choisir le restau');
    switch (this.restauChoice) {
      case 0 :
        this.stock = restaurant.stockItalian;
        this.recipe1 = restaurant.recipe1Italian;
        this.recipe2 = restaurant.recipe2Italian;
        this.restauItalianChoice = true;
        console.log(
          'nous allons vérifier que le restaurant italien est ouvert');

        break;
      case 1 :
        this.stock = restaurant.stockJap;
        this.recipe1 = restaurant.recipe1Jap;
        this.recipe2 = restaurant.recipe2Jap;
        this.restauJapChoice = true;
        console.log(
          'nous allons vérifier que le restaurant japonnais est ouvert');
        break;
      case 2 :
        this.stock = restaurant.stockFrench;
        this.recipe1 = restaurant.recipe1French;
        this.recipe2 = restaurant.recipe2French;
        this.restauFrenchChoice = true;
        console.log(
          'nous allons vérifier que le restaurant français est ouvert');
        break;
      default :
        console.log('Error');
    }

  }

  choiceRecipe(restaurant) {
    switch (this.recipeRandom) {
      case 0 :
        console.log('Nous allons vérifier que votre recette est réalisable');
        restaurant.createRecipe1(this.stock, this.recipe1)
          .then(() => {
            console.log('Nous allons préparer votre plat : ');
            console.log(this.recipe1);
            restaurant.useIngredients(this.stock, this.recipe1);
            restaurant.cook(this.resistance);
          })
          .catch(() => {
            restaurant.createRecipe2(this.stock, this.recipe2)
              .then(() => {
                console.log(
                  'Nous allons préparer votre plat : ');
                console.log(this.recipe2);
                restaurant.useIngredients(this.stock, this.recipe2);
                restaurant.cook(this.resistance);
              })
              .catch(() => {
                console.log(
                  'aucune recette n\'est disponible, nous en sommes désolés');
              });
          });
        break;
      case 1 :
        console.log('Nous allons vérifier que votre recette est réalisable');
        restaurant.createRecipe2(this.stock, this.recipe2)
          .then(() => {
            console.log('Nous allons préparer votre plat : ');
            console.log(this.recipe2);
            restaurant.useIngredients(this.stock, this.recipe2);
            restaurant.cook(this.resistance);
          })
          .catch(() => {
            restaurant.createRecipe1(this.stock, this.recipe1)
              .then(() => {
                console.log(
                  'Nous allons préparer votre plat : ');
                console.log(this.recipe1);
                restaurant.useIngredients(this.stock, this.recipe1);
                restaurant.cook(this.resistance);
              })
              .catch(
                () => console.log(
                  'aucune recette n\'est disponible, nous en sommes désolés'));
          });
        break;
    }
  }
}
module.exports.Client = Client;