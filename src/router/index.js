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
        path: 'user',
        component: () => import('@/views/system/user/list'),
        name: 'UserList',
        meta: {
          title: '用户列表',
          icon: 'icon-team',
          roles: ['3'],
        },
      },
      {
        path: 'log',
        component: () => import('@/views/system/userLog/list'),
        name: 'Log',
        meta: {
          title: '日志',
          icon: 'icon-unorderedlist',
          roles: ['3'],
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
        path: 'coefficient',
        component: () => import('@/views/conefficient/list'),
        name: 'Coefficient',
        meta: {
          title: '取值系数',
          roles: ['3'],
        },
      },
      {
        path: 'statisticDirector',
        component: () => import('@/views/statistic/director'),
        name: 'StatisticDirector',
        meta: {
          title: '项目负责人统计',
          roles: ['3'],
        },
      },
      {
        path: 'statisticDesign',
        component: () => import('@/views/statistic/design'),
        name: 'StatisticDesign',
        meta: {
          title: '设计统计',
          roles: ['3'],
        },
      },
      {
        path: 'statisticProject',
        component: () => import('@/views/statistic/project'),
        name: 'StatisticProject',
        meta: {
          title: '项目统计',
          roles: ['3'],
        },
      },
    ],
  },
  { path: '*', redirect: 'index', hidden: true },
];
