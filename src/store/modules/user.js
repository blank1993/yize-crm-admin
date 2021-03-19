// eslint-disable-next-line import/no-cycle
import LoginService from '@/services/login';
import { getToken, setToken, removeToken } from '@/utils/auth';

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    rolesMap: {},
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLESMAP: (state, roles) => {
      for (let i = 0; i < roles.length; i += 1) {
        state.rolesMap[roles[i].authority] = true;
      }
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        LoginService.login(username, userInfo.password, userInfo.key, userInfo.code)
          .then((response) => {
            const { data } = response;
            setToken(data);
            commit('SET_TOKEN', data);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ commit }) {
      return new Promise((resolve, reject) => {
        LoginService.getInfo()
          .then((response) => {
            const { data } = response;
            commit('SET_ROLES', [data.user.power]);
            commit('SET_ROLESMAP', data.permissions);
            commit('SET_NAME', data.user.username);
            commit('SET_AVATAR', data.user.username);
            resolve([data.user.power]);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '');
        removeToken();
        resolve();
      });
    },
  },
};

export default user;
