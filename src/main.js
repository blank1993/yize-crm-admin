import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-CN';
import 'element-ui/lib/theme-chalk/index.css';
import { DataTables, DataTablesServer } from 'vue-data-tables';
import '@/styles/index.scss'; // global css
import '@/permission'; // permission control
import '@/assets/iconfont/iconfont.css';
import '@/utils/directives';
import dayjs from 'dayjs';
import dayOfYear from 'dayjs/plugin/dayOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/plugin/isLeapYear';
import isoWeekYear from 'dayjs/plugin/isoWeek';
import store from './store';
import router from './router';
import App from './App.vue';
import { initMenu } from '@/utils/electron';
import { hasPermission } from '@/utils/permission';
import 'dayjs/locale/zh-cn';

// 处理缩放
document.body.style.zoom = store.state.app.zoomSize;
Vue.prototype.calc = (px) => {
  let vh = 100;
  if (store.state.app.zoomSize > 1) vh = 95;
  else if (store.state.app.zoomSize < 1) vh = 111;
  return { height: `calc(${vh}vh - ${px})` };
};

dayjs.locale('zh-cn');
// dayjs plugin
dayjs.extend(relativeTime);
dayjs.extend(dayOfYear);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
dayjs.extend(isoWeekYear);
Vue.prototype.$dayjs = dayjs;
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
