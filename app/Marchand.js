'use strict'

var Promise = require('bluebird');

class Marchand {
  constructor() {}

  openingRungis() {
    console.log("le marché de Rungis est ouvert");
  }

  closingRungis() {
    console.log("le marché de Rungis est fermé")
  }
}

module.exports.Marchand = Marchand;