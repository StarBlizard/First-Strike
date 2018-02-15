'use strict';

// Start configuration service
require('nconf').argv().env().file({ file: 'config/config.json' });

// Start winston logger
require('./services/winston').start();

// Start database
require('./services/database').start();

// Start Passport
require('./services/passport').start();

// Start Twitter API service
require('./services/twitter').start();

//Start server
require('./services/server').start();


//Load routes
require('./routes');
