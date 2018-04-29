'use strict';

const nconf = require('nconf');

let app     = require('./services/server').app;

// Controllers
let view    = require("./controllers/view");
let actions = require("./controllers/actions");
let game    = require("./controllers/game");

// Middleware
let started = require("./middlewares/started");

// Views
app.get('/', view.index);

// Actions
app.post('/connect'   , actions.connect);
app.get('/getConnect'   , actions.getConnect);
app.post('/disconnect', actions.disconnect);
app.post('/shot'      , started, actions.shot);
app.post('/hit'       , started, actions.hit);

app.post('/start' , game.start);
app.post('/stop'  , game.stop);
app.get('/players', game.players);
