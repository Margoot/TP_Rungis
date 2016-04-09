'use strict';
const chalk = require('chalk');


class Marchand {
  constructor() {
  }

  openingRungis() {
    console.log(chalk.cyan('RUNGIS MARKET : OPENED'));
  }

  closingRungis() {
    console.log(chalk.cyan('RUNGIS MARKET : CLOSED'));
  }
}

module.exports.Marchand = Marchand;