'use strict';

const udhcpd = require('wireless-tools/udhcpd');
const nconf  = require('nconf');
const _      = require('underscore');

module.exports = {
  start(){
    let options = _.extend(nconf.get('wifi:dhcp'), nconf.get('wifi:default'));

    udhcpd.enable(options, function(err) {
      if(err){
        console.log("[DCHP] ERROR: ", err);
        return;
      }
      console.log("DHCP: OK");
      // the dhcp server was started
    });
  }
};
