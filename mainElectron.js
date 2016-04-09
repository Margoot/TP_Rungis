

'use strict';
var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

//var mainWindow = null;



//app.on('ready', createMainWindow());



 app.on('ready', function() {
   var mainWindow = new BrowserWindow({
     width: 1400,
     height: 700
   });

   mainWindow.loadURL('file://' + __dirname + "/app/tp_rungis.html");
   mainWindow.webContents.openDevTools();
   mainWindow.on('closed', function() {
     mainWindow = null;
   });
 });
app.on('window-all-closed',function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});






/*/Users/simonthome/Documents/Master1/JavaScript/TP_Rungis*/