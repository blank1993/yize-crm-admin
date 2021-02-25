import NProgress from 'nprogress'; // Progress 进度条
import { Notification } from 'element-ui';
import { getToken } from '@/utils/auth'; // 验权
import router from './router';
import store from './store';
import 'nprogress/nprogress.css';// Progress 进度条样式


const whiteList = ['/login', '/license']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.configure({ showSpinner: false });
  NProgress.start();

  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/index' });
    } else if (store.getters.roles.length === 0) {
      store.dispatch('GetInfo').then((res) => { // 拉取用户信息
        const roles = res; // note: roles must be a array! such as: ['editor','develop']
        roles.push('default');
        store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
        });
      }).catch(() => {
        store.dispatch('FedLogOut').then(() => {
          Notification.error({
            title: '错误',
            message: '验证失败,请重新登录',
            duration: 2500,
          });
          next({ path: '/login' });
        });
      });
    } else {
      next();
    }
  } else if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    next('/login');
    NProgress.done();
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
