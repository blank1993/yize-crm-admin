import request from '@/utils/request';

const list = (params) => request({
  url: '/admin/project',
  method: 'get',
  params,
});

const add = (project) => request({
  url: '/admin/project',
  method: 'post',
  data: project,
});

const update = (project) => request({
  url: '/admin/project',
  method: 'put',
  data: project,
});

const remove = (id) => request({
  url: `/admin/project/${id}`,
  method: 'delete',
});

const get = (id) => request({
  url: `/admin/project/${id}`,
  method: 'get',
});

const listByCode = (projectCode) => request({
  url: '/admin/project/listByCode',
  method: 'get',
  params: { projectCode },
});

const importProject = (file) => {
  const params = new FormData();
  params.append('file', file);
  return request({
    url: '/admin/project/import',
    method: 'post',
    data: params,
  });
};

const exportExcel = (params) => request({
  url: '/admin/project/export',
  method: 'post',
  params,
  responseType: 'blob',
});

const query = (params) => request({
  url: '/admin/project/query',
  method: 'get',
  params,
});


export default {
  add,
  list,
  update,
  get,
  remove,
  listByCode,
  importProject,
  exportExcel,
  query,
};
