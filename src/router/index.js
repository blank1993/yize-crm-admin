import Vue from 'vue';
import Router from 'vue-router';

/* Layout */
import Layout from '../views/layout/Layout.vue';

Vue.use(Router);

export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: 'index',
    children: [{
      path: 'index',
      name: 'Home',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'icon-dashboard', affix: true },
    }],
  },
];
export default new Router({
  // mode: 'history', //后端支持可开
  routes: constantRouterMap,
});

export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: 'noredirect',
    name: '系统设置',
    alwaysShow: true,
    meta: {
      title: '系统设置',
      icon: 'icon-setting-fill',
    },
    children: [
      {
        path: 'log',
        component: () => import('@/views/system/userLog/list'),
        name: 'Log',
        meta: {
          title: '日志',
          icon: 'icon-unorderedlist',
          roles: ['0'],
        },
      },
    ],
  },
  {
    path: '/project',
    component: Layout,
    redirect: 'noredirect',
    name: '项目',
    alwaysShow: true,
    meta: {
      title: '项目',
      icon: 'icon-project',
    },
    children: [
      {
        path: 'list',
        component: () => import('@/views/project/list'),
        name: 'ProjectList',
        meta: {
          title: '项目进度',
        },
      },
      {
        path: 'statistic',
        component: () => import('@/views/statistic/list'),
        name: 'ProjectStatistic',
        meta: {
          title: '数据汇总',
        },
      },
    ],
  },
  { path: '*', redirect: 'index', hidden: true },
];
