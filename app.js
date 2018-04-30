'use strict';

// Start configuration service
require('nconf').argv().env().file({ file: 'config/config.json' });

require('./services/wifi').start();

// Start hotspot
require('./services/dhcp').start().then( () => {
  require('./services/hotspot').start().then(() => {

    // Start database
    require('./services/database').start();

    //Start server
    require('./services/server').start();

    //Start ws server
    require('./services/ws').start();

    //Start UI
    require('./services/ui').start();

    //Load routes
    require('./routes');
  });
});
