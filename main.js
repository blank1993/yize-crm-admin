
// eslint-disable-next-line import/no-extraneous-dependencies
const electron = require('electron');
const Datastore = require('nedb');
const prompt = require('electron-prompt');

const db = new Datastore({ filename: 'path/to/datafile', autoload: true });

const { app, BrowserWindow } = electron;

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
  {
    label: '机器标识',
    click() {
      const { machineIdSync } = require('node-machine-id');
      electron.dialog.showMessageBox({ type: 'info', title: '标识', message: machineIdSync({ original: true }) });
    },
  },
  {
    label: '请求地址',
    click() {
      prompt({
        title: '输入地址',
        value: '',
        label: '地址',
        type: 'input',
      })
        .then((r) => {
          if (r !== null) {
            db.remove({}, { multi: true });
            db.insert({ key: 'url', value: r });
          }
        })
        .catch(console.error);
    },
  },
];

// 自定义顶部菜单
const { Menu } = electron;
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: false,
      preload: `${__dirname}/preload.js`,
    },
  });
  // eslint-disable-next-line prefer-destructuring
  mainWindow.maximize();
  mainWindow.show();

  // 在窗口内要展示的内容为 ./dist/index.html，即打包生成的index.html

  db.find({ key: 'url' }, (err, docs) => {
    if (docs[0]) {
      mainWindow.loadURL(docs[0].value);
    }

    // 自动打开调试台
    mainWindow.webContents.openDevTools({
      detach: true,
    });

    mainWindow.on('closed', () => {
      // 回收BrowserWindow对象
      mainWindow = null;
    });
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
