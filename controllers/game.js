'use strict';

let players = require('../lib/players');
let game    = require('../services/game');

module.exports = {

  start(req, res){
    if(game.started){return;}
    console.log(req.body.timer)
    game.start(req.body.timer);
    return res.status(200).send(true);
  },

	stop(req, res){
    console.log("STOOOOOOP")
    game.stop();
    return res.status(200).send(true);
  }
};
