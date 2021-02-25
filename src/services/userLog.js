import request from '@/utils/request';

const list = (current, size, sort, keyWord) => {
  let asc = null;
  let desc = null;
  if (sort.order === 'ascending') {
    asc = sort.prop.replace(/([A-Z])/g, '_$1').toLowerCase();
  }
  if (sort.order === 'descending') {
    desc = sort.prop.replace(/([A-Z])/g, '_$1').toLowerCase();
  }
  return request({
    url: '/admin/userLog',
    method: 'get',
    params: {
      asc,
      desc,
      size,
      current,
      keyWord,
    },
  });
};

const add = (userLog) => request({
  url: '/admin/userLog',
  method: 'post',
  data: userLog,
});

const update = (userLog) => request({
  url: '/admin/userLog',
  method: 'put',
  data: userLog,
});

const remove = (id) => request({
  url: `/admin/userLog/${id}`,
  method: 'delete',
});

const get = (id) => request({
  url: `/admin/userLog/${id}`,
  method: 'get',
});

export default {
  add,
  list,
  update,
  get,
  remove,
};
