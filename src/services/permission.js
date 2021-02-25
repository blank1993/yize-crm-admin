import request from '@/utils/request';

const tree = () => request({
  url: '/admin/permission/tree',
  method: 'get',
});

const remove = (id) => request({
  url: `/admin/permission/${id}`,
  method: 'delete',
});

const get = (id) => request({
  url: `/admin/permission/${id}`,
  method: 'get',
});

const add = (permission) => request({
  url: '/admin/permission',
  method: 'post',
  data: permission,
});

const update = (permission) => request({
  url: '/admin/permission',
  method: 'put',
  data: permission,
});

export default {
  tree,
  remove,
  get,
  add,
  update,
};
