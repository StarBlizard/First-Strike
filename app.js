'use strict';

// Start configuration service
require('nconf').argv().env().file({ file: 'config/config.json' });

// Start winston logger
require('./services/winston').start();

// Start DHCP service
require('./services/dhcp').start();

// Start hotspot
require('./services/hotspot').start();

// Start database
//require('./services/database').start();

//Start server
require('./services/server').start();


//Load routes
require('./routes');
