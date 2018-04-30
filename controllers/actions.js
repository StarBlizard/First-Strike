'use strict';

const _      = require('underscore');
const { io } = require('../services/ws');

let players = require('../lib/players');
let getHex = require('../lib/getHex');
let game   = require('../services/game');

module.exports = {

  connect(req, res){
    // TODO: RECONNECT SERVICE
    if(game.started){ return res.status(401).send(false); }

    let ip         = req.header('x-forwarded-for') || req.connection.remoteAddress;
    let collection = players.getCollection();

    let logged = collection.reduce( (logged, player) => {
      return (player.ip == ip) ? true : false;
    }, false);

    //if(logged){ return res.status(401).send(false); }

    let id = getHex();

    players[id] = {
      alive : true,
      score : 0,
      ip    : ip
    };

    io.emit('player:CONNECT', { id : id });
    return res.status(200).send({id});
  },

  disconnect(req, res){
    // TODO: BAN KICKED PLAYERS

    let {player} = req.body;

    delete players[player];

    io.emit('player:KICK', { id : player });
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

    if(!players[shooter].shoot ||
       !players[shooter].alive ||
       !players[hitted].alive  ||
       hitted === shooter       )
      { return res.status(401).send(true); }

    players[hitted].alive = false;
    players[shooter].score++;

    // Patching bug where the id disapears
    (players[shooter].id) || (players[shooter].id = shooter);
    (players[hitted].id)  || (players[hitted].id  = hitted);

    io.emit('player:HIT', { hitted : players[hitted], shooter : players[shooter] });

    if(players.state().alive == 1){
      game.stop();
      players.reset();
    }

    return res.status(200).send(true);
	},

  shot(req, res){
    let shooter = req.body.player;

    console.log("[SHOT]: ", shooter);

    if(!players[shooter].alive || players[shooter].shoot){ return res.status(401).send(false); }

    players[shooter].shoot = true;

    /*
    setTimeout(() => {
      players[shooter].shoot = null;
    }, 100);
    */

    setTimeout(() => {
      players[shooter].shoot = null;
    }, 5000);

    return res.status(200).send(true);
  }
};
