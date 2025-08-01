const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getData: () => ipcRenderer.invoke('get-data'),
  addReward: (text) => ipcRenderer.invoke('add-reward', text),
  deleteReward: (i) => ipcRenderer.invoke('delete-reward', i),
  addTodo: (todo) => ipcRenderer.invoke('add-todo', todo),
  toggleTodo: (i) => ipcRenderer.invoke('toggle-todo', i),
  deleteTodo: (i) => ipcRenderer.invoke('delete-todo', i),
  minimize: () => ipcRenderer.send('window-minimize'),
  close: () => ipcRenderer.send('window-close')
});
