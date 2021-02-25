// eslint-disable-next-line import/no-cycle
import request from '@/utils/request';

const login = (username, password, key, code) => {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);
  params.append('key', key);
  params.append('code', code);
  return request({
    url: '/admin/user/login',
    method: 'post',
    data: params,
  });
};

const getInfo = () => request({
  url: '/admin/user/currentUser',
  method: 'get',
});

const logout = () => request({
  url: '/admin/user/logout',
  method: 'post',
});

export default {
  login,
  getInfo,
  logout,

};
