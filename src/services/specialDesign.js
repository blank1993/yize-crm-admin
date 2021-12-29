import request from '@/utils/request';

const list = (params) => request({
  url: '/admin/specialDesign',
  method: 'get',
  params,
});

const add = (specialDesign) => request({
  url: '/admin/specialDesign',
  method: 'post',
  data: specialDesign,
});

const update = (specialDesign) => request({
  url: '/admin/specialDesign',
  method: 'put',
  data: specialDesign,
});

const remove = (id) => request({
  url: `/admin/specialDesign/${id}`,
  method: 'delete',
});

const get = (id) => request({
  url: `/admin/specialDesign/${id}`,
  method: 'get',
});

const exportExcel = (params) => request({
  url: '/admin/specialDesign/export',
  method: 'post',
  params,
  responseType: 'blob',
});

const listByCode = (params) => request({
  url: '/admin/specialDesign/listByCode',
  method: 'get',
  params,
});

const importSpecialDesign = (file) => {
  const params = new FormData();
  params.append('file', file);
  return request({
    url: '/admin/specialDesign/import',
    method: 'post',
    data: params,
  });
};

export default {
  add,
  list,
  update,
  get,
  remove,
  listByCode,
  exportExcel,
  importSpecialDesign,
};
