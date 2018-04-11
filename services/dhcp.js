'use strict';

const udhcpd = require('wireless-tools/udhcpd');
const nconf  = require('nconf');
const _      = require('underscore');

module.exports = {
  start(){
    return new Promise(( resolve, reject ) => {
      let options = _.extend(nconf.get('wifi:dhcp'), nconf.get('wifi:default'));

      udhcpd.enable(options, function(err) {
        if(err){
          console.log("[DCHP] ERROR: ", err);
          return reject();
        }
        console.log("DHCP: OK");
        return resolve();
        // the dhcp server was started
      });
    });
  }
};
