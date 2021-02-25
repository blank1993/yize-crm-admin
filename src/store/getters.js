const getters = {
  sidebar: (state) => state.app.sidebar,
  token: (state) => state.user.token,
  avatar: (state) => state.user.avatar,
  name: (state) => state.user.name,
  roles: (state) => state.user.roles,
  rolesMap: (state) => state.user.rolesMap,
  addRouters: (state) => state.permission.addRouters,
  permission_routers: (state) => state.permission.routers,
};
export default getters;
