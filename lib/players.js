'use strict';

const _ = require('underscore');

let players = {};

players.__proto__.getCollection = function(){
  return _.reduce(this, (arr, player, index) => {
    player.id = index;
    arr.push(player);
    return arr;
  }, []);
};

players.__proto__.toRevive = function(){
  return _.map(this, (player, index) => {
    player.id    = index;
    player.alive = true;
    player.kills = 0;

    return player;
  });
};

players.__proto__.state = function(){
  return _.countBy(this, player => {
    return (player.alive) ? "alive" : "casualities"
  });
};

players.__proto__.end = function(){
  let result = _.map(this, player => {
    player.score += (player.alive) ? player.kills*2 : player.kills;
    return player;
  });

  this.__proto__.scores = _.sortBy(result, player => {
    return -player.score;
  });

  return this.__proto__.scores;
};

players.__proto__.reset = function(){
   return _.map(this, (player, index) => {
    player.id    = index;
    player.alive = true;
    player.kills = 0;
    player.score = 0;

    return player;
  });
};

module.exports = players;

/*
 * STRUCTURE
 */

/*
   {
   'B4' : {
      alive : true,
      kills : 3,
      score : 12,
      shoot : false,
      ip    : '192....'
    }
   }
*/
