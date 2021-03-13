import request from '@/utils/request';

const list = (keyWord) => request({
  url: '/admin/project',
  method: 'get',
  params: {
    keyWord,
  },
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

export default {
  add,
  list,
  update,
  get,
  remove,
};
