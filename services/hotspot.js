/*
 * Hotspot fo gameee
 * to kill hotspot  --> sudo killall hostapd
 * to allow hotspot --> sudo killall wpa_supplicant
 * to restore wifi  --> sudo rfkill unblock all
 *
 * TASKS:
 * 1.- Verify if I can create the hotpost service without disconnectig the current network
 *
 * gedit /etc/NetworkManager/system-connections/${networkName}
 */

'use strict';

const ifconfig       = require('wireless-tools/ifconfig');
const _              = require('underscore');
const nconf          = require('nconf');
const command        = require('../lib/command');

module.exports = {

  // Maybe install hostapd???
  // TODO: get driver data, detect if a wifi is connected, and kill it if it is
  start(){
    this.hotspotOptions = _.extend(nconf.get('wifi:hotspot')   , nconf.get('wifi:default'));
    this.ifOptions      = _.extend(nconf.get('wifi:ifconfig')  , nconf.get('wifi:default'));

    // To know if a wifi is connected, the command is "nmcli n"

//    let killwifi = command("nmcli networking off");

    let startHotspot = command('sudo nmcli dev wifi hotspot'   +
                                ' ifname '   + wlp2s0b1         +
                                ' con-name ' + GRETAYEL         +
                                ' ssid '     + '"First Strike"' +
                                ' password ' + '5tr1g0nT34m');

    /*
    migration.stdout.on('data', data => {
      Logger.info(colorfilter.filtrate(data));
    });
    migration.stderr.on('data', warn => {
      Logger.warn(colorfilter.filtrate(warn));
    });
    */


    startHotspot.on('close', code =>{
      if(code != 0){
//        return reject('Killing wifi failed');
      }
      console.log("[HOTSPOT]: Enabled")
    });
  },

  enable(){
    hostapd.enable(this.hotspotOptions, (err) => {
      if(err){ console.log("[HOTSPOT]: ERROR", err); return; }
      console.log("[HOTSPOT]: OK");
      //this.setupNetwork();
      // the access point was created
    });
  },

  setupNetwork(){
    wpa_supplicant.enable(this.ifOptions, (err) => {
      if(err){ console.log("[HOTSPOT]: SETUP ERROR", err); return; }
      console.log("[HOTSPOT]: SETUP OK");
    });
  }
};
