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

const getRolesByUserId = (id) => request({
  url: `/admin/user/${id}/roles`,
  method: 'get',
});

const updateUserRole = (id, roles) => request({
  url: `/admin/user/${id}/roles`,
  method: 'post',
  data: roles,
});

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

const modifyPassword = (passwordModel) => request({
  url: '/admin/user/modifyPassword',
  method: 'post',
  data: passwordModel,
});

const verifyCode = () => request({
  url: '/admin/user/verifyCode',
  method: 'post',
});

export default {
  add,
  list,
  update,
  get,
  modifyPassword,
  getRolesByUserId,
  remove,
  updateUserRole,
  verifyCode,
};
