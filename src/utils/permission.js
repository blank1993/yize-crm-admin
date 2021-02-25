import store from '@/store';

export function hasPermission(permission) {
  const permissions = store.getters.roles;
  for (let i = 0; i < permissions.length; i += 1) {
    if (permissions[i].authority === permission) {
      return true;
    }
  }
  return false;
}

// 可以删除
export function t() {}
