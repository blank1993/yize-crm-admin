// eslint-disable-next-line import/no-cycle
import request from '@/utils/request';

const upload = (file) => {
  const params = new FormData();
  params.append('file', file);
  return request({
    url: '/admin/file/upload',
    method: 'post',
    data: params,
  });
};


export default {
  upload,
};
