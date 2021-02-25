import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css';
import { DataTables, DataTablesServer } from 'vue-data-tables';
import { hasPermission } from '@/utils/permission';
import { initLicense } from '@/utils';
import { autoUpdate, initMenu } from '@/utils/electron';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/styles/index.scss'; // global css
import '@/permission'; // permission control
import '@/assets/iconfont/iconfont.css';

// 处理缩放
document.body.style.zoom = store.state.app.zoomSize;
Vue.prototype.calc = (px) => {
  let vh = 100;
  if (store.state.app.zoomSize > 1) vh = 95;
  else if (store.state.app.zoomSize < 1) vh = 111;
  return { height: `calc(${vh}vh - ${px})` };
};

Vue.use(ElementUI, { locale });
Vue.use(DataTables);
Vue.use(DataTablesServer);
Vue.directive('has', {
  inserted(el, binding) {
    if (!hasPermission(binding.value)) {
      el.parentNode.removeChild(el);
    }
  },
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
initMenu();
autoUpdate();
initLicense();
