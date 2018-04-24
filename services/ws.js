let server = require('./server');
let router = require('../events/router');

module.exports = {
  start(){
    this.io = require('socket.io')(server.http);
    this.io.on('connection', router);
  }
};
