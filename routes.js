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
app.get('/connect'   , actions.connect);
app.post('/disconnect', actions.disconnect);
app.get('/check'     , actions.check);
app.get('/shot'      , started, actions.shot);
app.get('/hit'       , started, actions.hit);

app.post('/start'    , game.start);
app.post('/stop'     , game.stop);
app.post('/reset'    , game.reset);
app.post('/state'    , game.state);
app.post('/getScores', game.getScores);
app.get('/players', game.players);
