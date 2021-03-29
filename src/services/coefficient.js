// eslint-disable-next-line import/no-cycle
import request from '@/utils/request';

const list = () => request({
  url: '/admin/coefficient',
  method: 'get',
});

const update = (data) => request({
  url: '/admin/coefficient',
  method: 'post',
  params: data,
});


export default {
  list,
  update,
};
