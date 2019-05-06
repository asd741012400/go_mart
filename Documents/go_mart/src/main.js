import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import VueI18n from 'vue-i18n'
import LangENUS from './lang/en-us'
import LangZHCN from './lang/zh-cn'
Vue.use(Vant);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zh-cn',
  messages: {
    'en-us': LangENUS,
    'zh-cn': LangZHCN
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
