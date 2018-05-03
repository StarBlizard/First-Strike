'use strict';

const Logger = require('../lib/logger.js');
const { io } = require('../services/ws');
let players = require('../lib/players');

module.exports = {

  started     : false,
  time        : 0,
  haveStarted : false,

  start(time){
    if(this.started){ return; }
    players.toRevive();

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
    clearInterval(this.interval);
    clearTimeout(this.timeout);
    this.haveStarted = true;
    io.emit('game:ENDED', players.end());
    this.started = false;
    Logger.info("Game ended")
  }
};
