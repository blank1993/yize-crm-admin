import request from '@/utils/request';

const list = (current, size, keyWord) => request({
  url: '/admin/role',
  method: 'get',
  params: {
    current,
    size,
    keyWord,
  },
});

const add = (role) => request({
  url: '/admin/role',
  method: 'post',
  data: role,
});

const update = (role) => request({
  url: '/admin/role',
  method: 'put',
  data: role,
});

const remove = (id) => request({
  url: `/admin/role/${id}`,
  method: 'delete',
});

const get = (id) => request({
  url: `/admin/role/${id}`,
  method: 'get',
});

const findByRoleId = (id) => request({
  url: `/admin/role/${id}/permission`,
  method: 'get',
});

const updateRolePermission = (id, dataList) => request({
  url: `/admin/role/${id}/permission`,
  method: 'post',
  data: dataList,
});

export default {
  list,
  remove,
  add,
  update,
  get,
  findByRoleId,
  updateRolePermission,
};
