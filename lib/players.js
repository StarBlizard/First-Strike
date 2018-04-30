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

players.__proto__.reset = function(){
  return _.map(this, (player, index) => {
    player.id    = index;
    player.alive = true;
    player.score = 0;

    return player;
  });
};

players.__proto__.state = function(){
  return _.countBy(this, player => {
    return (player.alive) ? "alive" : "casualities"
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
      score : 4,
      shoot : false,
      ip    : '192....'
    }
   }
*/
