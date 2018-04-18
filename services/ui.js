'use strict';

const {app, BrowserWindow} = require('electron');

const path = require('path')
const url = require('url')

module.exports = {

  start(){
    app.on('ready', this.createWindow);

    return app;
  },

  createWindow(){
    // Create the browser window.
    let win = new BrowserWindow({width: 800, height: 600})

    // and load the index.html of the app.
    win.loadURL(url.format({
      pathname: path.join(__dirname, '../ui/index.html'),
      protocol: 'file:',
      slashes : true
    }))
  }
};
