/*
 * Hotspot fo gameee
 * WEBSERVER SOCKET WILL BE 10.42.0.1
 *
 * TODO
 * 1.- Get wifi interface name
 * 2.- Delete wifi connection when app goes down
 * 3.- Be sure if an application is using the PORT 80
 *
 */

'use strict';

const _           = require('underscore');
const nconf       = require('nconf');
const command     = require('../lib/command');
const Logger      = require('../lib/logger');
const colorfilter = require('../lib/colorfilter');

module.exports = {

  start(){
    this.networkOptions = _.extend(nconf.get('wifi:network') , nconf.get('wifi:default'));

    // To clean created connections when node exits
    process.on('SIGINT', this.exitHandler.bind(this));
    process.on('exit'  , this.exitHandler.bind(this));

    return new Promise(( resolve, reject ) => {

      let commandString = "sudo nmcli dev wifi list";

      Logger.info(`Running: ${commandString}`);

      let connections = command(commandString, {shell : true});
      let isUp        = false;

      connections.stdout.on('data', data => {
        isUp = ((data+"").indexOf(this.networkOptions.ssid)) > 0 ? true : false;
      });

      connections.stderr.on('data', data => {
        Logger.error(data);
      });

      connections.on('close', code => {
        if( isUp ){
          Logger.info(`First Strike network is alredy up`);
          return resolve();
        }
        return this.createHotspot(resolve, reject);
      });
    });
  },

  createHotspot : function(resolve, reject){
    let commandString = `sudo nmcli dev wifi hotspot `               +
                        `ifname '${this.networkOptions.interface}' ` +
                        `con-name '${this.networkOptions.ssid}' `    +
                        `ssid '${this.networkOptions.ssid}' `        +
                        `password '${this.networkOptions.passphrase}'`;

    Logger.info(`Running: ${commandString}`);

    let startHotspot = command(commandString, {shell : true});

    startHotspot.stdout.on('data', data => {
      Logger.info(colorfilter.filtrate(data));
    });

    startHotspot.stderr.on('data', warn => {
      Logger.warn(colorfilter.filtrate(warn));
    });

    return startHotspot.on('close', code =>{
      if(code != 0){
        Logger.info("[HOTSPOT]: Error: ", code);
        return reject();
      }
      Logger.info("[HOTSPOT]: Enabled");
      return resolve();
    });
  },

  // Move...
  exitHandler : function(options, err) {
    Logger.warn("Exiting... please wait a few seconds");

    let states = {
      disconnect : false,
      delete     : false
    };

    // Delete connection and disconnect
    let commandString = `sudo nmcli connection down '${this.networkOptions.ssid}'`;

    Logger.info(`Running: ${commandString}`);

    let disconnect = command(commandString, {shell : true});

    disconnect.stdout.on('data', data => {
      Logger.info(colorfilter.filtrate(data));
    });

    disconnect.stderr.on('data', warn => {
      Logger.warn(colorfilter.filtrate(warn));
    });

    disconnect.on('data', code => {
      states.disconnect = true;
      if(states.delete){ process.exit(); }
    });

    let deleteCommandString = `sudo nmcli connection delete '${this.networkOptions.ssid}'`;
    Logger.info(`Running: ${deleteCommandString}`);

    let deleteConnection = command(deleteCommandString, {shell : true});

    deleteConnection.stdout.on('data', data => {
      Logger.info(colorfilter.filtrate(data));
    });

    deleteConnection.stderr.on('data', warn => {
      Logger.warn(colorfilter.filtrate(warn));
    });

    deleteConnection.on('data', code => {
      states.delete = true;
      if(states.disconnect){ process.exit(); }
    });

  }
};
