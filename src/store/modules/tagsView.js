const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: [],
  },
  mutations: {
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some((v) => v.path === view.path)) {
        for (const [i, v] of state.visitedViews.entries()) {
          if (v.path === view.path) {
            state.visitedViews[i].query = view.query;
            break;
          }
        }
        return;
      }
      state.visitedViews.push({
        name: view.name,
        meta: view.meta,
        path: view.path,
        query: view.query,
        title: view.meta.title || 'no-name',
      });
      if (view.meta.cache) {
        state.cachedViews.push(view.name);
      }
    },
    DEL_VISITED_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          state.visitedViews.splice(i, 1);
          break;
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews.splice(index, 1);
          break;
        }
      }
    },
    DEL_OTHERS_VIEWS: (state, view) => {
      state.visitedViews = state.visitedViews.filter((v) => v.meta.affix || v.path === view.path);
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i);
          state.cachedViews = state.cachedViews.slice(index, i + 1);
          break;
        }
      }
    },
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = state.visitedViews.filter((tag) => tag.meta.affix);
      state.cachedViews = [];
    },
  },
  actions: {
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view);
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view);
        resolve([...state.visitedViews]);
      });
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS');
        resolve([...state.visitedViews]);
      });
    },
  },
};

export default tagsView;
