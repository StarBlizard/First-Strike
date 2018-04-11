'use strict';

// Start configuration service
require('nconf').argv().env().file({ file: 'config/config.json' });

// Start hotspot
require('./services/hotspot').start().then(() => {
  // Start database
  //require('./services/database').start();

  //Start server
  require('./services/server').start();

  //Load routes
  require('./routes');
});

