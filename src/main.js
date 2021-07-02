// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Lazyload } from 'vant'
import 'vant/lib/index.css';
// import 'http://at.alicdn.com/t/font_2031686_g446h3oa4n.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import echarts from 'echarts'
// import lrz from 'lrz'

// require styles
import 'swiper/swiper-bundle.css'
import domain from './domain.js';
global.domain = domain;

axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
// Vue.prototype.HOME = '/api'

Vue.use(VueAwesomeSwiper /* { default global options } */)

Vue.use(Lazyload)
// Vue.use(lrz)

Vue.config.productionTip = false

// main.js
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
