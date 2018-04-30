'use strict';

let players = require('../lib/players');
let game    = require('../services/game');

module.exports = {

  start(req, res){
    if(game.started){return;}
    game.start(req.body.timer);
    return res.status(200).send(true);
  },

	stop(req, res){
    game.stop();
    return res.status(200).send(true);
  },

  players(req, res){
    let collection = players.getCollection();

    return res.status(200).send(collection);
  },

  state(req, res){
    let data = {
      time    : game.time,
      started : game.started
    };

    return res.status(200).send(data);
  }
};
