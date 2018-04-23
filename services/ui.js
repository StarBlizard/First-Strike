'use strict';

const {app, BrowserWindow} = require('electron');

const path  = require('path')
const nconf = require('nconf')
const url   = require('url')

module.exports = {

  start(){
    app.on('ready', this.createWindow);

    return app;
  },

  createWindow(){
		let PORT = nconf.get('PORT') || process.env.NODE_PORT;

    // Create the browser window.
    let win = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    win.loadURL(`http://localhost:${PORT}`);
  }
};
