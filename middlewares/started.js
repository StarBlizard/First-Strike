'use strict';

let game = require('../services/game');

module.exports = function(req, res, next){
  if(!game.started){ return res.send(false); }
  next();
}
