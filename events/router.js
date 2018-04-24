let disconnect = require('./disconnect');

module.exports = function(socket){
  console.log("connected")
  socket.on('player:ADD', disconnect)
};
