import request from '@/utils/request';

const getInfo = () => request({
  url: '/admin/license',
  method: 'get',
});

export default {
  getInfo,
};
