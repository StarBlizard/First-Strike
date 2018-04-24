'use strict';

const {app, BrowserWindow} = require('electron');

const path  = require('path')
const nconf = require('nconf')
const url   = require('url')

module.exports = {

  start(){
    this.createWindow();
    return app;
  },

  createWindow(){
		let PORT = nconf.get('PORT') || process.env.NODE_PORT;

    // and load the index.html of the app.
    const mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false,
        devTools       : true,
        javascript     : true,

      }
    });
    console.log("pepe")

    mainWindow.loadURL(`http://localhost:${PORT}`);
    mainWindow.webContents.openDevTools();
  }
};
