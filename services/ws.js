const socketio = require("socket.io");

let server = require('./server');
let router = require('../events/router');

module.exports = {
  start(){
    /*
    this.io = new socketio();
    this.io.attach(server.server);

    this.io.on('connection', router);
    */

    this.io = require('socket.io')(server.http);
    this.io.on('connection', router);
  }
};
