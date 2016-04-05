'use strict';
const electron = require('electron');
//var chalk = require('chalk');
//var events = require('events');
var eventEmitter = new events.EventEmitter();
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

//define the mainWindow
let mainWindow;
function createWindow () {
  //set the size and the content of the window
  console.log(chalk.green("window started"));
  mainWindow = new BrowserWindow({width: 800, height: 800});
  //mainWindow.loadURL('file://' + __dirname + '/index.html');
  //mainWindow.webContents.openDevTools();
}

createWindow();