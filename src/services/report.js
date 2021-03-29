// eslint-disable-next-line import/no-cycle
import request from '@/utils/request';

const director = () => request({
  url: '/admin/report/director',
  method: 'get',
});


export default {
  director,
};
