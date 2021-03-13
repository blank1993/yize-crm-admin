import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar: {
      opened: Cookies.get('sidebarStatus'),
    },
    zoomSize: Cookies.get('zoomSize') === undefined ? 1 : Cookies.get('zoomSize'),
    license: { sysName: '后台管理系统' },
  },
  mutations: {
    TOGGLE_SIDEBAR: (state) => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    SET_ZOOM_SIZE: (state, size) => {
      Cookies.set('zoomSize', size);
      state.zoomSize = size;
    },
    SET_LICENSE: () => {
      // state.license = license;
    },
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR');
    },
  },
};

export default app;
