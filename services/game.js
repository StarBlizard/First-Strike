'use strict';

let players = require('../lib/players');

module.exports = {

  started : false,

  start(time){
    if(this.started){ return; }

    console.log("[INFO] Game started")
    this.started = true;

    setTimeout(() => {
      this.started = false;
      console.log("[INFO] Game ended")
    }, time);
  }
};
