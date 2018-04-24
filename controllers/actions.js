'use strict';

let players = require('../lib/players');
let game    = require('../services/game');

module.exports = {

  connect(req, res){
    if(!game.started){ return; }

    // player should be player's hexadecimal code
    let player = req.body

    players[player] = {
      alive : true,
      score : 0
    };

    console.log("[NEW PLAYER]: ", player);
  },

	hit(req, res){
    /*
     * data = {
     *   hitted : XX,
     *   shooter: XX
     * }
     */

    let { shooter, hitted } = req.body;

    console.log(`[HIT] ${hitted} by [SHOOTER] ${shooter}`);

    if(!players[shooter].shoot || !players[shooter].alive || !players[hitted].alive){ return; }

    players[hitted].alive = false;
    players[shooter].score++;
	},

  shot(req, res){
    // shooter should be equal to shooter's hexadecimal code
    let shooter = req.body;

    console.log("[SHOT]: ", data);

    if(!players[shooter].alive){ return; }

    players[shooter] = true;

    setTimeout(() => {
      players[shooter] = null;
    }, 5000);
  }
};
