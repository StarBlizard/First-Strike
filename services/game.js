'use strict';

const Logger = require('../lib/logger.js');
const { io } = require('../services/ws');
let players = require('../lib/players');

module.exports = {

  started : false,
  time    : 0,

  start(time){
    if(this.started){ return; }

    io.emit('game:START', { time : this.time });

    this.time = time/1000;

    Logger.info("Game started")
    this.started = true;

    io.emit('game:SECOND', { time : this.time });

    this.timeout = setTimeout(() => {
      Logger.info("Game ended")
    }, time);

    this.interval = setInterval(() => {
      this.time--;
      io.emit('game:SECOND', { time : this.time });
      if(this.time == 0){this.stop();}
    }, 1000);
  },

  stop(){
    players.reset();
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    io.emit('game:ENDED');
    this.started = false;
    Logger.info("Game ended")
  }
};
