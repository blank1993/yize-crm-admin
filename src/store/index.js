import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import permission from './modules/permission';
// eslint-disable-next-line import/no-cycle
import user from './modules/user';
import getters from './getters';
import tagsView from './modules/tagsView';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    user,
    tagsView,
  },
  getters,
});

export default store;
