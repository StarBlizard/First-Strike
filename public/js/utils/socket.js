define( require => {
  const io = require("socketio");

  return io('http://10.42.0.1:8080');

  /*
  Creator.socket.on('print:STEP', Creator.Methods.updateStep);
  Creator.socket.on('print:INFO', Creator.Methods.printInfo);
  Creator.socket.on('print:ERROR', Creator.Methods.printError);
  */
});
