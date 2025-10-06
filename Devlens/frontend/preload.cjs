const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  getPageContent: (url) => ipcRenderer.invoke('get-page-content', url),
});