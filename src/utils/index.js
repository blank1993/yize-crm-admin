import json2csv from 'json2csv';
import store from '@/store';
import LicenseService from '@/services/license';

export function exportCsv(data, fields, fieldNames, fileName) {
  const result = json2csv({
    data,
    fields,
    fieldNames,
  });

  const utf = '\uFEFF'; // 为了使Excel以utf-8的编码模式，同时也是解决中文乱码的问题
  if (window.Blob && window.URL && window.URL.createObjectURL) {
    const csvData = new Blob([utf + result], {
      type: 'text/csv',
    });

    const alink = document.createElement('a');
    alink.id = 'linkDwnldLink';
    alink.href = URL.createObjectURL(csvData);
    document.body.appendChild(alink);
    const linkDom = document.getElementById('linkDwnldLink');
    linkDom.setAttribute('download', `${fileName}.csv`);
    linkDom.click();
    document.body.removeChild(linkDom);
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function has(permission) {
  return store.getters.rolesMap[permission] === true;
}

export async function initLicense() {
  try {
    const { data } = await LicenseService.getInfo();
    store.commit('SET_LICENSE', data.data);
  } finally {
    window.document.title = store.state.app.license.sysName;
  }
}
