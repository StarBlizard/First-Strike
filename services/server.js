'use strict';

const nconf 	      = require('nconf');
const Server 	      = require('http').Server;
const cookieParser  = require('cookie-parser');
const express 	    = require('express');
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

		this.server = new Server();
		this.app    = express(this.server);

		// Stablishing public folder
		this.app.use(express.static(path.join(__dirname, '../public/')));

		// Instancing cookieParser
		this.app.use(cookieParser());

		// Instacing body parser, to post request
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended : true }));

		// Session middlewares
//		this.app.use(session({ secret : 'secret', resave: true, saveUninitialized: true }));
//		this.app.use(passport.initialize());
//    this.app.use(passport.session());

		// To log clients connections
		this.app.use(function(req, res, next){
			Logger.info('Incoming request: ', req.url, req.connection.remoteAddress);
			return next();
		});

		// To indicate the port to listen
		this.app.listen(this.PORT, function(){
			Logger.info('[Server] Start server at 10.42.0.1:', this.PORT);
		});
  }
};
