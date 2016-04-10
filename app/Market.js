'use strict';
const chalk = require('chalk');

/**
 * class to define opening and closing hours of the Rungis market
 */
class Market {
  constructor() {
  }

  openingRungis() {
    console.log(chalk.cyan('RUNGIS MARKET : OPENED'));
  }

  closingRungis() {
    console.log(chalk.cyan('RUNGIS MARKET : CLOSED'));
  }
}

module.exports.Market = Market;
