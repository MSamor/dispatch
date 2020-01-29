import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vant from 'vant';
import 'vant/lib/index.css';

import axios from 'axios'
Vue.prototype.$axios = axios.create({
  baseURL:'http://localhost:8080'
})

Vue.use(Vant);
Vue.config.productionTip = false

import global from './components/common.vue'
Vue.prototype.common = global

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
