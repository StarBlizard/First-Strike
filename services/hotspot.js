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
const command     = require('../lib/command');
const Logger      = require('../lib/logger');
const colorfilter = require('../lib/colorfilter');

module.exports = {

  // Maybe install hostapd???
  // TODO: get driver data, detect if a wifi is connected, and kill it if it is
  start(){
    this.networkOptions = _.extend(nconf.get('wifi:network') , nconf.get('wifi:default'));
    this.dhcpOptions    = _.extend(nconf.get('wifi:dhcp')    , nconf.get('wifi:default'));
    this.ifOptions      = _.extend(nconf.get('wifi:ifconfig'), nconf.get('wifi:default'));

    // To know if a wifi is connected, the command is "nmcli n"

    let commandString = `sudo ifconfig ${this.ifOptions.interface} `   +
                        `netmask ${this.ifOptions.ipv4_subnet_mask} `  +
                        `broadcast ${this.ifOptions.ipv4_broadcast} up`;

    console.log(commandString)

    let setup = command(commandString, {shell : true});

    setup.stdout.on('data', data => {
      Logger.info(colorfilter.filtrate(data));
    });

    setup.stderr.on('data', warn => {
      Logger.warn(colorfilter.filtrate(warn));
    });


    return new Promise(( resolve, reject ) => {
      setup.on('close', code =>{
        if(code != 0){
          console.log("[HOTSPOT]: Error: ", code);
          return reject();
        }
        console.log("[HOTSPOT]: Enabled");
        return this.setAdHocMode(resolve, reject);
      });
    });
  },

  setAdHocMode : function(resolve, reject){
     let commandString = `sudo iwconfig ${this.ifOptions.interface} `  +
                         `essid '${this.networkOptions.ssid}' `        +
                         `mode ad-hoc `                                +
                         `key '${this.networkOptions.passphrase}' `    ;

     console.log(commandString)

    let adhoc = command(commandString, {shell : true});

    adhoc.stdout.on('data', data => {
      Logger.info(colorfilter.filtrate(data));
    });

    adhoc.stderr.on('data', warn => {
      Logger.warn(colorfilter.filtrate(warn));
    });


    adhoc.on('close', code =>{
      if(code != 0){
        console.log("[HOTSPOT]: Error: ", code);
        return reject();
      }
      console.log("[HOTSPOT]: Enabled");
      return this.setHotspot(resolve, reject);
    });
  },

  setHotspot : function(resolve, reject){

    let commandString = "iptables-restore < saved-hotspot-iptables";
    console.log(commandString)
    let hotspot = command(commandString, {shell : true});

    hotspot.stdout.on('data', data => {
      Logger.info(colorfilter.filtrate(data));
    });

    hotspot.stderr.on('data', warn => {
      Logger.warn(colorfilter.filtrate(warn));
    });

    hotspot.on('close', code =>{
      if(code != 0){
        console.log("[HOTSPOT]: Error: ", code);
        return reject();
      }
      console.log("[HOTSPOT]: Enabled");
      return this.echo(resolve, reject);
    });

  },

  echo : function(resolve, reject){


    let commandString = "echo 1 > /proc/sys/net/ipv4/ip_forward";
    console.log(commandString);
    let hotspot = command(commandString, {shell : true});

    hotspot.stdout.on('data', data => {
      Logger.info(colorfilter.filtrate(data));
    });

    hotspot.stderr.on('data', warn => {
      Logger.warn(colorfilter.filtrate(warn));
    });

    hotspot.on('close', code =>{
      if(code != 0){
        console.log("[HOTSPOT]: Error: ", code);
        return reject();
      }
      console.log("[HOTSPOT]: Enabled");
      return this.dns(resolve, reject);
    });

  },

 dns : function(resolve, reject){

   let commandString = `sudo dnsmasq -C /dev/null >/dev/null 2>&1 --bind-interfaces`        +
                       `--listen-address=${this.ifOptions.ipv4_address}}`                   +
                       `--dhcp-range=${this.dhcpOptions.start}, ${this.dhcpOptions.end},12h`;

   console.log(commandString);

    let hotspot = command(commandString, {shell : true});

    hotspot.stdout.on('data', data => {
      Logger.info(colorfilter.filtrate(data));
    });

    hotspot.stderr.on('data', warn => {
      Logger.warn(colorfilter.filtrate(warn));
    });

    hotspot.on('close', code =>{
      if(code != 0){
        console.log("[HOTSPOT]: Error: ", code);
        return reject();
      }
      console.log("[HOTSPOT]: Enabled");
      return this.setAdHocMode(resolve, reject);
    });

  },



};
