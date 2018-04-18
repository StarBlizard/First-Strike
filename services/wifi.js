'use strict';

const _            = require('underscore');
const nconf        = require('nconf');
const Logger       = require('../lib/logger');
const { execSync } = require('child_process');

module.exports = {

  start(){
    let command = 'for dev in `ls /sys/class/net`; do ' +
                  'if [ -d "/sys/class/net/$dev/wireless" ]; then echo $dev; fi; ' +
                  'done';

    let device = execSync(command, {shell : true})
    if(!device){ Logger.warn("NO WIFI CARD"); return; }

    // TODO -> SET INTERFACE ON CONFIG FILE
    nconf.set("wifi:default:interface", device);

    console.log(nconf.get("wifi:default:interface"))
  }
};
