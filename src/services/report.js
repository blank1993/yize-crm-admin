// eslint-disable-next-line import/no-cycle
import request from '@/utils/request';

const director = (params) => request({
  url: '/admin/report/director',
  method: 'get',
  params,
});


export default {
  director,
};
