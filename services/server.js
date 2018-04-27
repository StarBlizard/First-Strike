'use strict';

const nconf 	      = require('nconf');
const Server 	      = require('http').Server;
const express 	    = require('express');
const cookieParser  = require('cookie-parser');
const child_process = require('child_process');
//const session 	   = require('express-session');
const bodyParser    = require('body-parser');
const path          = require('path');
//const passport 	   = require('./passport.js').passport;
const Logger        = require('../lib/logger.js');
const command       = require('../lib/command');

module.exports = {

	start(){

		this.PORT = nconf.get('PORT') || process.env.NODE_PORT;


    this.app  = express();
		this.http = Server(this.app);

//		this.server = new Server();
//		this.app    = express(this.server);

		// Stablishing public folder
		this.app.use(express.static(path.join(__dirname, '../public/')));

		// Instancing cookieParser
		this.app.use(cookieParser());

		// Instacing body parser, to post request
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended : true }));

    this.app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

		// To log clients connections
		this.app.use(function(req, res, next){
//			Logger.info('Incoming request: ', req.url, req.connection.remoteAddress);
			return next();
		});

		// To indicate the port to listen
		this.http.listen(this.PORT, function(){
			Logger.info('[Server] Start server at 10.42.0.1:', this.PORT);
		});
  }
};
