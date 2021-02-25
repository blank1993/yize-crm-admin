import request from '@/utils/request';

const list = (current, size, sort = {}, pid) => {
  let asc = null;
  let desc = null;
  if (sort.order === 'ascending') {
    asc = sort.prop.replace(/([A-Z])/g, '_$1').toLowerCase();
  }
  if (sort.order === 'descending') {
    desc = sort.prop.replace(/([A-Z])/g, '_$1').toLowerCase();
  }
  return request({
    url: '/admin/dictionary',
    method: 'get',
    params: {
      pid,
      asc,
      desc,
      size,
      current,
    },
  });
};

const add = (dictionary) => request({
  url: '/admin/dictionary',
  method: 'post',
  data: dictionary,
});

const update = (dictionary) => request({
  url: '/admin/dictionary',
  method: 'put',
  data: dictionary,
});

const remove = (id) => request({
  url: `/admin/dictionary/${id}`,
  method: 'delete',
});

const get = (id) => request({
  url: `/admin/dictionary/${id}`,
  method: 'get',
});

const listTypes = () => request({
  url: '/admin/dictionary/types',
  method: 'get',
});

export default {
  add,
  list,
  update,
  get,
  remove,
  listTypes,
};
