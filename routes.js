'use strict';

const nconf           = require('nconf');

// Controllers
let app               = require('./services/server').app;
let viewController    = require("./controllers/viewController");
let pepeController    = require("./controllers/pepeController");
let papaController    = require("./controllers/papaController");

// Views
app.get('/', viewController.index);

app.get('/pepe', pepeController);
app.post('/papa', papaController);
