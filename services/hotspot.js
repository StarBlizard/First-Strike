/*
 * Hotspot fo gameee
 * WEBSERVER SOCKET WILL BE 10.42.0.1
 *
 * TODO
 * 1.- Get wifi interface name
 *
 */

'use strict';

const _           = require('underscore');
const nconf       = require('nconf');
const iwconfig    = require('wireless-tools/iwconfig');
const command     = require('../lib/command');
const Logger      = require('../lib/logger');
const colorfilter = require('../lib/colorfilter');

module.exports = {

  // Maybe install hostapd???
  // TODO: get driver data, detect if a wifi is connected, and kill it if it is
  start(){
    this.networkOptions = _.extend(nconf.get('wifi:network') , nconf.get('wifi:default'));

    return new Promise(( resolve, reject ) => {

      iwconfig.status( status => {
        console.log(status);
        if(_.find(status, function(network){ return network.interface === this.networkOptions.ssid; })){
          return resolve();
        }
        return this.createHotspot(resolve, reject);
      } );
    });
  },

  createHotspot : function(resolve, reject){

    let commandString = `sudo nmcli dev wifi hotspot `               +
      `ifname '${this.networkOptions.interface}' ` +
      `con-name '${this.networkOptions.ssid}' `    +
      `ssid '${this.networkOptions.ssid}' `        +
      `password '${this.networkOptions.passphrase}'`;

    console.log(commandString)

    let startHotspot = command(commandString, {shell : true});

    startHotspot.stdout.on('data', data => {
      Logger.info(colorfilter.filtrate(data));
    });

    startHotspot.stderr.on('data', warn => {
      Logger.warn(colorfilter.filtrate(warn));
    });


    return startHotspot.on('close', code =>{
      if(code != 0){
        console.log("[HOTSPOT]: Error: ", code);
        return reject();
      }
      console.log("[HOTSPOT]: Enabled");
      return resolve();
    });
  }
};
