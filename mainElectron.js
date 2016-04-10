'use strict';
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');

/**
 * creation of the window
 */
app.on('ready', function () {
  var mainWindow = new BrowserWindow({
    width: 1400,
    height: 900
  });

  /**
   * importation of the file html
   */
  mainWindow.loadURL('file://' + __dirname + "/app/tp_rungis.html");
  mainWindow.webContents.openDevTools();
  /**
   * close the window
   */
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
});
/**
 * close the window but not the application
 */
app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});



