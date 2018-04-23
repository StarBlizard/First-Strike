'use strict';

const nconf = require('nconf');

let app     = require('services/server').app;

// Controllers
let view    = require("controllers/view");
let actions = require("controllers/action");

// Middleware
let started = require("middleware/started");

// Views
app.get('/', viewController.index);

// Actions
app.post('/shot', started, actions.shot);
app.post('/hit' , started, actions.hit);
