'use strict';

const Logger = require('../lib/logger.js');
let players = require('../lib/players');

module.exports = {

  started : false,

  start(time){
    if(this.started){ return; }

    Logger.info("Game started")
    this.started = true;

    this.timeout = setTimeout(() => {
      this.started = false;
      Logger.info("Game ended")
    }, time);
  },

  stop(){
    clearTimeout(this.timeout);
    this.started = false;
    Logger.info("Game ended")
  }
};
