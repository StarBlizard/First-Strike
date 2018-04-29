'use strict';

let players = require('../lib/players');
let getHex = require('../lib/getHex');
let game   = require('../services/game');
let { io } = require('../services/ws');

module.exports = {

  connect(req, res){
    console.log("SEEEE CONECTOOO POR POST ERIIIIICKKKKKK")
    console.log("Informacion que enviaste: ", req.body);
    if(game.started){ return res.status(401).send(false); }

    // player should be player's hexadecimal code
    let player = getHex();

    players[player] = {
      alive : true,
      score : 0
    };

    console.log("[NEW PLAYER]: ", player);
    io.emit('player:CONNECT', { id : player });
    return res.status(200).send({player});
  },

  connect(req, res){
    console.log("SEEEE CONECTOOO POR GET ERIIIIICKKKKKK")
    console.log("Informacion que enviaste: ", req.query);
    return res.status(200).send(true);
  },

  disconnect(req, res){
    if(game.started){ return res.status(401).send(false); }

    // player should be player's hexadecimal code
    let {player} = req.body;

    delete players[player];

    console.log("[KICKED PLAYER]: ", player);
    return res.status(200).send(true);
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
    return res.status(200).send(true);
	},

  shot(req, res){
    // shooter should be equal to shooter's hexadecimal code
    let shooter = req.body;

    console.log("[SHOT]: ", data);

    if(!players[shooter].alive || players[shooter].shoot){ return res.status(401).send(false); }

    players[shooter] = true;

    setTimeout(() => {
      players[shooter] = null;
    }, 100);

    return res.status(200).send(true);
  }
};
