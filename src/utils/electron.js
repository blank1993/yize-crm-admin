/**
 * 判断点击区域可编辑
 * @param {*} e
 */
function isEleEditable(e) {
  if (!e) {
    return false;
  }
  if (e.tagName === 'INPUT' || e.contentEditable === 'true') {
    return true;
  }
  // 递归查询父节点
  return isEleEditable(e.parentNode);
}
/**
 * 初始化右键菜单
 */
export function initMenu() {
  if (!window.electron) return;
  const { electron } = window;
  const { remote } = electron;
  const { Menu, MenuItem } = remote;
  const menu = new Menu();
  const menu2 = new Menu();
  const menu3 = new Menu();
  menu.append(new MenuItem({ label: '撤销', role: 'undo' }));
  menu.append(new MenuItem({ label: '重做', role: 'redo' }));
  menu.append(new MenuItem({ label: '剪切', role: 'cut' }));
  menu.append(new MenuItem({ label: '复制', role: 'copy' }));
  menu.append(new MenuItem({ label: '粘贴', role: 'paste' }));
  menu.append(new MenuItem({ label: '删除', role: 'delete' }));
  menu.append(new MenuItem({ label: '全选', role: 'selectall' }));

  menu2.append(new MenuItem({ label: '复制', role: 'copy' }));
  menu2.append(new MenuItem({ label: '刷新', role: 'reload' }));

  menu3.append(new MenuItem({ label: '刷新', role: 'reload' }));

  window.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (isEleEditable(e.target)) {
      menu.popup(remote.getCurrentWindow());
    } else if (e.ignore !== 'true') {
      // 判断有文本选中
      const selectText = window.getSelection().toString();
      if (selectText) {
        menu2.popup(remote.getCurrentWindow());
      } else {
        menu3.popup(remote.getCurrentWindow());
      }
    }
  }, false);
}

export function autoUpdate() {
  if (!window.electron) return;
  const { ipcRenderer } = window.electron;
  ipcRenderer.on('message', (event, { message, data }) => {
    switch (message) {
      case 'isUpdateNow':
        // eslint-disable-next-line no-alert
        if (window.confirm(`检测到新版本${JSON.stringify(data.version)},是否立即升级？`)) {
          ipcRenderer.send('updateNow');
        }
        break;
      default: break;
    }
  });
}
