const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getRecipes: (ingredients) => ipcRenderer.invoke('get-recipes', ingredients)
});