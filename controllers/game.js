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
    const _ = require('underscore');
    let collection = _.reduce(players, (arr, player, index) => {
      player.id = index;
      arr.push(player);
      return arr;
    }, []);

    console.log(collection);

    return res.status(200).send(collection);
  }
};
