'use strict';

var Promise = require('bluebird');

var Marchand = require('./Marchand.js');

class Restaurant {
  constructor() {
    this.openTimeResItalian =
      Math.floor(Math.random() * 24);
    this.closeTimeResItalian =
      Math.floor(Math.random() * 24);
    this.openTimeResJap =
      Math.floor(Math.random() * 24);
    this.closeTimeResJap =
      Math.floor(Math.random() * 24);
    this.openTimeResFrench =
      Math.floor(Math.random() * 24);
    this.closeTimeResFrench =
      Math.floor(Math.random() * 24);


    this.emptyStock = 0;
    this.openResItalian = false;
    this.openResJap = false;
    this.openResFrench = false;
    this.italianScore = 0;
    this.japScore = 0;
    this.frenchScore = 0;

    this.stockItalian = {
      "eggs": 1,
      "pasta": 1,
      "bacon": 1,
      "cream": 1,
      "onions": 1,
      "salad": 1,
      "tomatoes": 1,
      "mozarella": 1,
      "chicken": 1,
      "parmesan": 1
    };
    this.stockJap = {
      "sushi": 1,
      "california": 1,
      "maki": 1,
      "brochettes": 1,
      "miso soup": 1,
      "ramen": 1,
      "maki nutella": 1
    };
    this.stockFrench = {
      "beef": 1,
      "sauce": 1,
      "riz": 1,
      "bread": 1,
      "potatoes": 1,
      "cheese": 1,
      "ham": 1,
      "carrot": 1
    };
    this.recipe1Italian = {
      "eggs": 1,
      "pasta": 1,
      "bacon": 1,
      "cream": 1,
      "onions": 1
    };
    this.recipe2Italian = {
      "salad": 1,
      "tomatoes": 1,
      "mozarella": 1,
      "chicken": 1,
      "parmesan": 1
    };
    this.recipe1Jap = {
      "sushi": 1,
      "california": 1,
      "maki": 1,
      "brochettes": 1
    };
    this.recipe2Jap = {
      "miso soup": 1,
      "ramen": 1,
      "maki nutella": 1
    };
    this.recipe1French = {
      "beef": 1,
      "sauce": 1,
      "riz": 1,
      "bread": 1
    };
    this.recipe2French = {
      "potatoes": 1,
      "cheese": 1,
      "ham": 1,
      "carrot": 1
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
    console.log("Le restaurant Italien est ouvert");
  };

  closingResItalian() {
    this.openResItalian = false;
    console.log("Le restaurant Italien est fermé");
  };

  openingResJap() {
    this.openResJap = true;
    console.log("Le restaurant Japonnais est ouvert");
  };

  closingResJap() {
    this.openResJap = false;
    console.log("Le restaurant Japonnais est fermé");
  };

  openingResFrench() {
    this.openResFrench = true;
    console.log("Le restaurant Français est ouvert");
  };

  closingResFrench() {
    this.openResFrench = false;
    console.log("Le restaurant Français est fermé");
  };


  createRecipe1(stock, recipe) {

    return new Promise((resolve, reject) => {
      var numIng = 0;
      for (var i in recipe) {
        for (var j in stock) {
          if (i === j && stock.hasOwnProperty(j)) {
            if (stock[j] > 0) {
              numIng++;
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
    console.log("nouveau stock après consommation : ");
    for (var i in recipe) {
      for (var j in stock) {
        if (i === j && stock.hasOwnProperty(j)) {
          stock[j]--;
        }
      }
    }
    console.log(stock);
  };

  cook(resistance) {
    var cookTime = Math.floor((Math.random() * 50) + 5);
    setTimeout(()=> {
      if (cookTime > resistance) {
        console.log(
          "j'ai déjà attendu " + resistance + "minutes, c'est trop long ! ");
      }

      else {
        console.log("Votre plat est prêt!!");
        if (cookTime < (resistance - 10))
          this.scoreCase = 2;
        else
          this.scoreCase = 1;
      }
    }, cookTime);

  }

  createRecipe2(stock, recipe) {
    return new Promise((resolve, reject) => {
      var numIng = 0;
      for (var i in recipe) {
        for (var j in stock) {
          if (i === j && stock.hasOwnProperty(j)) {
            if (stock[j] > 0) {
              numIng++;
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
      if (this.stockItalian[i] === 0) {
        this.emptyStock++;
      }
    }
    if (this.emptyStock >= 4) {
      console.log("Le restaurant Italien se rend à Rungis ");
      setTimeout(() => {
        for (var i in this.stockItalian) {
          this.stockItalian[i] = 20;
        }
        console.log("Le Restaurant Italien a fini son ravitaillement en " +
          refuelingTime + " minutes");
      }, refuelingTime);
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
      console.log("Le restaurant Japonais se rend à Rungis ");
      setTimeout(() => {
        for (var i in this.stockJap) {
          this.stockJap[i] = 20;
        }
        console.log("Le Restaurant Japonais a fini son ravitaillement en " +
          refuelingTime + " minutes");
      }, refuelingTime);
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
      console.log("Le restaurant Français se rend à Rungis ");
      setTimeout(() => {
        for (var i in this.stockFrench) {
          this.stockFrench[i] = 20;
        }
        console.log("Le Restaurant Français a fini son ravitaillement en " +
          refuelingTime + " minutes");
      }, refuelingTime);
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
    console.log("le score du restaurant Italien est de : " +
      (this.italianScore * this.closeTimeResItalian));
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
    console.log("le score du restaurant Japonais est de : " +
      (this.japScore * this.closeTimeResJap));
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
    console.log("le score du restaurant Français est de : " +
      (this.frenchScore * this.closeTimeResFrench));
  }
}

module.exports.Restaurant = Restaurant;