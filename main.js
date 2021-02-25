
// eslint-disable-next-line import/no-extraneous-dependencies
const electron = require('electron');

const { app, ipcMain, BrowserWindow } = electron;

const path = require('path');
const url = require('url');

const feedUrl = 'http://127.0.0.1:80/update';

const template = [
  {
    label: '编辑',
    submenu: [
      { role: 'undo', label: '撤销' },
      { role: 'redo', label: '重做' },
      { type: 'separator' },
      { role: 'cut', label: '剪切' },
      { role: 'copy', label: '复制' },
      { role: 'paste', label: '粘贴' },
      { role: 'delete', label: '删除' },
    ],
  },
  {
    label: '视图',
    submenu: [
      { role: 'reload', label: '刷新' },
      { role: 'togglefullscreen', label: '全屏' },
      { type: 'separator' },
      { role: 'quit', label: '退出' },
    ],
  },
];

// 自定义顶部菜单
const { Menu } = electron;
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

let mainWindow;
let webContents;

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
    },
  });
  // eslint-disable-next-line prefer-destructuring
  webContents = mainWindow.webContents;
  mainWindow.maximize();
  mainWindow.show();

  // 在窗口内要展示的内容为 ./dist/index.html，即打包生成的index.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './dist', 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // 自动打开调试台
  // mainWindow.webContents.openDevTools({
  //   detach: true,
  // });

  mainWindow.on('closed', () => {
    // 回收BrowserWindow对象
    mainWindow = null;
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
