import axios from 'axios';
import { Notification, MessageBox } from 'element-ui';
import { getToken } from '@/utils/auth';
import Router from '@/router/index';
// eslint-disable-next-line import/no-cycle
import store from '../store';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
  timeout: 60000, // 请求超时时间
});

// request拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${getToken()}`; // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config;
}, (error) => Promise.reject(error));

// response拦截器
service.interceptors.response.use(
  (response) => {
  /**
  * code为非200是抛错 可结合自己业务进行修改
  */
    const res = response.data;
    if (res.code !== 200) {
      if (res.code === 401) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            window.location.reload();// 为了重新实例化vue-router对象 避免bug
          });
        });
      } else if (res.code === 10010) {
        Router.push({ path: '/license', query: { mac: res.data, msg: res.msg } });
      } else {
        Notification.error({
          title: '错误',
          message: res.msg,
          duration: 2500,
        });
      }
      return Promise.reject(res);
    }
    return Promise.resolve(res);
  },
  (error) => {
    const { response } = error;
    let msg = '网络异常';
    if (response && response.data) {
      msg = response.data.message;
    }
    Notification.error({
      title: '错误',
      message: msg,
      duration: 2500,
    });
    return Promise.reject(error);
  },
);

export default service;
