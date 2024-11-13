const {contextBridge, ipcRenderer} = require('electron');

// Expose the `ipcRenderer` methods to the renderer process
contextBridge.exposeInMainWorld('electron', {
    onInstallPython: (callback) => ipcRenderer.on('install-python', callback),
});
