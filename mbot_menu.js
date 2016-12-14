/*
const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = Menu.getApplicationMenu()
menu.append(new MenuItem({label: 'RUN', click() { runCode() }}))
Menu.setApplicationMenu(menu)*/
const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('runCode', function(message) {
      runCode();  // Prints "whoooooooh!"
    });
