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
    path: '/license',
    component: () => import('@/views/license'),
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
  {
    path: '',
    hidden: true,
    component: Layout,
    redirect: 'noredirect',
    children: [{
      hidden: true,
      path: '/reset',
      component: () => import('@/views/system/user/resetPassword'),
      name: 'ResetPassword',
      meta: {
        title: '修改密码',
        icon: 'password',
        // or you can only set roles in sub nav
      },
    }],
  },
  {
    path: '',
    hidden: true,
    component: Layout,
    redirect: 'noredirect',
    children: [{
      hidden: true,
      path: '/about',
      component: () => import('@/views/about'),
      name: 'about',
      meta: {
        title: '关于',
      },
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
    children: [{
      path: 'user',
      component: () => import('@/views/system/user/list'),
      name: 'UserList',
      meta: {
        title: '用户列表',
        icon: 'icon-team',
        roles: ['user:list'],
        cache: true,
      },
    },
    {
      path: 'role',
      component: () => import('@/views/system/role/list'),
      name: 'RoleList',
      meta: {
        title: '角色管理',
        icon: 'icon-skin',
        roles: ['role:list'],
      },
    },
    {
      path: 'permission',
      component: () => import('@/views/system/permission/list'),
      name: 'PermissionList',
      meta: {
        title: '权限配置',
        icon: 'icon-lock-fill',
        roles: ['permission:list'],
      },
    },
    {
      path: 'upload',
      component: () => import('@/views/system/upload'),
      name: 'Upload',
      meta: {
        title: '文件上传',
        icon: 'icon-upload',
        roles: ['upload'],
      },
    },
    {
      path: 'dictionary',
      component: () => import('@/views/system/dictionary'),
      name: 'Dictionary',
      meta: {
        title: '数据字典',
        icon: 'icon-database-fill',
        roles: ['dictionary:list'],
      },
    },
    {
      path: 'log',
      component: () => import('@/views/system/userLog/list'),
      name: 'Log',
      meta: {
        title: '日志',
        icon: 'icon-unorderedlist',
        roles: ['userLog:list'],
      },
    },
    ],
  },
  { path: '*', redirect: 'index', hidden: true },
];
