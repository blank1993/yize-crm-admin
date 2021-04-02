// eslint-disable-next-line import/no-cycle
import request from '@/utils/request';

const director = (params) => request({
  url: '/admin/report/director',
  method: 'get',
  params,
});

const design = (params) => request({
  url: '/admin/report/design',
  method: 'get',
  params,
});

const project = (params) => request({
  url: '/admin/report/project',
  method: 'get',
  params,
});

const updateCodeName = (params) => request({
  url: '/admin/report/updateCodeName',
  method: 'post',
  params,
});

const projectExport = (params) => request({
  url: '/admin/report/projectExport',
  method: 'post',
  params,
  responseType: 'blob',
});

const directorExport = (params) => request({
  url: '/admin/report/directorExport',
  method: 'post',
  params,
  responseType: 'blob',
});

const designExport = (params) => request({
  url: '/admin/report/designExport',
  method: 'post',
  params,
  responseType: 'blob',
});


export default {
  director,
  design,
  project,
  updateCodeName,
  projectExport,
  directorExport,
  designExport,
};
