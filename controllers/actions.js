'use strict';

const _      = require('underscore');
const { io } = require('../services/ws');

let players = require('../lib/players');
let getHex = require('../lib/getHex');
let game   = require('../services/game');

module.exports = {

  connect(req, res){
    // TODO: RECONNECT SERVICE
    let ip         = req.header('x-forwarded-for') || req.connection.remoteAddress;
    let collection = players.getCollection();

    let logged = collection.reduce( (logged, player) => {
      return (player.ip == ip) ? player : false;
    }, false);


    if(logged){ 
      logged.active = true;
//      io.emit('player:RECONNECT', { status : logged.alive });
//      logged.timeout = setTimeout( () => {
//      io.emit('player:DISCONNECT', { id : logged.id });
//        console.log("timeout")
//        logged.active = false;
//      }, 5000 );

      return res.status(200).send(logged.id);
    }

    if(game.started){ return res.status(401).send(false); }

    let id = getHex();

    console.log(5)
    players[id] = {
      alive  : true,
      active : true,
      kills  : 0,
      score  : 0,
      ip     : ip,
      id     : id
    };

//    players[id].timeout = setTimeout( () => {
//      io.emit('player:DISCONNECT', { id : id });
//      console.log("timeout")
//      players[id].active = false;
//    }, 5000 );

    io.emit('player:CONNECT', players[id]);
    return res.status(200).send(id);
  },

  disconnect(req, res){
    // TODO: BAN KICKED PLAYERS

    let {player} = req.body;

    delete players[player];

    io.emit('player:KICK', { id : player });
    console.log("[KICKED PLAYER]: ", player);
    return res.status(200).send(true);
  },

  check(req, res){
    let { id } = req.query;
 
    if(!id){ return res.status(401).send(false); }

    clearTimeout(players[id].timeout);
    players[id].timeout = setTimeout( () => {
      console.log("timeout")
      io.emit('player:DISCONNECT', { id });
      players[id].active = false;
    }, 6000 );

    return res.status(200).send(true);
  },

	hit(req, res){
    /*
     * data = {
     *   hitted : XX,
     *   shooter: XX
     * }
     */

    let { shooter, hitted } = req.query;

    console.log(`[SHOOTER] ${shooter} -> [HIT] ${hitted}`);

    if(!players[shooter].shoot ||
       !players[shooter].alive ||
       !players[hitted].alive  ||
       hitted === shooter       )
      { return res.status(401).send(true); }

    players[hitted].alive = false;
    players[shooter].kills++;

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
    let shooter = req.query.player;

    console.log("[SHOT]: ", shooter);

    if(!players[shooter].alive || players[shooter].shoot){ return res.status(401).send(false); }

    players[shooter].shoot = true;

    /*
    setTimeout(() => {
      players[shooter].shoot = null;
    }, 100);
    */

    setTimeout(() => {
      delete players[shooter].shoot;
    }, 5000);

    return res.status(200).send(true);
  }
};
