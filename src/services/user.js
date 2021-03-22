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
    url: '/admin/user',
    method: 'get',
    params: {
      asc,
      desc,
      keyWord,
      size,
      current,
    },
  });
};


const add = (user) => request({
  url: '/admin/user',
  method: 'post',
  data: user,
});

const update = (user) => request({
  url: '/admin/user',
  method: 'put',
  data: user,
});

const remove = (id) => request({
  url: `/admin/user/${id}`,
  method: 'delete',
});

const get = (id) => request({
  url: `/admin/user/${id}`,
  method: 'get',
});


export default {
  add,
  list,
  update,
  get,
  remove,
};
