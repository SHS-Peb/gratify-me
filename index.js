const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

// Data storage locations
const dataPath = app.getPath('userData');
const rewardsFile = path.join(dataPath, 'rewards.json');
const todosFile = path.join(dataPath, 'todos.json');

// Helpers for JSON
function loadJson(file, fallback) {
  try {
    if (fs.existsSync(file)) {
      return JSON.parse(fs.readFileSync(file));
    }
  } catch {}
  return fallback;
}
function saveJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Create window
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 800,
    resizable: false,
    frame: false,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadFile(path.join(__dirname, 'renderer', 'index.html'));
}

app.whenReady().then(() => {
  if (!fs.existsSync(rewardsFile)) saveJson(rewardsFile, { rewards: [] });
  if (!fs.existsSync(todosFile)) saveJson(todosFile, { todos: [] });
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

// IPC (communication with frontend)
ipcMain.handle('get-data', () => ({
  rewards: loadJson(rewardsFile, { rewards: [] }).rewards,
  todos: loadJson(todosFile, { todos: [] }).todos
}));
ipcMain.handle('add-reward', (e, text) => {
  const data = loadJson(rewardsFile, { rewards: [] });
  data.rewards.push(text);
  saveJson(rewardsFile, data);
  return data.rewards;
});
ipcMain.handle('delete-reward', (e, idx) => {
  const data = loadJson(rewardsFile, { rewards: [] });
  data.rewards.splice(idx, 1);
  saveJson(rewardsFile, data);
  return data.rewards;
});
ipcMain.handle('add-todo', (e, todo) => {
  const data = loadJson(todosFile, { todos: [] });
  data.todos.push(todo);
  saveJson(todosFile, data);
  return data.todos;
});
ipcMain.handle('toggle-todo', (e, idx) => {
  const data = loadJson(todosFile, { todos: [] });
  data.todos[idx].done = !data.todos[idx].done;
  saveJson(todosFile, data);

  // Random reward if done
  const rewards = loadJson(rewardsFile, { rewards: [] }).rewards;
  let reward = null;
  if (data.todos[idx].done && rewards.length > 0) {
    reward = rewards[Math.floor(Math.random() * rewards.length)];
  }
  return { todos: data.todos, reward };
});
ipcMain.handle('delete-todo', (e, idx) => {
  const data = loadJson(todosFile, { todos: [] });
  data.todos.splice(idx, 1);
  saveJson(todosFile, data);
  return data.todos;
});
ipcMain.on('window-minimize', () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.on('window-close', () => {
  if (mainWindow) mainWindow.close();
});
