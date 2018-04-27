'use strict';

const _            = require('underscore');
const nconf        = require('nconf');
const Logger       = require('../lib/logger');
const { execSync } = require('child_process');

module.exports = {

  start(){
    let ifCommand = 'for dev in `ls /sys/class/net`; do '       +
                    'if [ -d "/sys/class/net/$dev/wireless" ];' +
                    'then echo $dev; fi; '                      +
                    'done';

    let drCommand = 'sudo lshw -short | grep "Wireless interface"';

    let device = execSync(ifCommand, {shell : true});
    let driver = execSync(drCommand, {shell : true});

    if(!device){ Logger.error("NO WIFI CARD"); return; }
    if(!driver){ Logger.error("NO DRIVER");    return; }

    nconf.set("wifi:default:interface", (device+"").replace("\n", ""));
    nconf.set("wifi:network:driver"   , _.compact((driver+"").split(" "))[1]);
  }
};
