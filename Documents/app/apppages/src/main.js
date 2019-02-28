import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import echarts from "echarts";
import swiper from 'swiper' 
import 'swiper/dist/css/swiper.css'
import YDUI from 'vue-ydui'; /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css';
import common from "./components/js/components.js";
Vue.use(YDUI);
Vue.config.productionTip = false;

Vue.prototype.$http = axios;
Vue.prototype.common = common;
Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  axios,
  swiper,
  render: h => h(App)
}).$mount("#app");
