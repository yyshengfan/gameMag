// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Promise from 'es6-promise';
Promise.polyfill();

import lodash from 'lodash'
import Vue from 'vue'
Vue.config.productionTip = false
Vue.$log = Vue.prototype.$log = function(){}

//font-awesome
import 'font-awesome/css/font-awesome.css'

//element-ui
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI);
import './resource/css/style.css'
//login
import './resource/css/styleLogin.css'
import './resource/css/MyAnimate.css'
// bigice
import './resource/css/information.css'
//swal
import swal from 'sweetalert2'
Vue.$swal = Vue.prototype.$swal = swal

//highcharts
import Highcharts from 'highcharts';
Vue.$Highcharts = Vue.prototype.$Highcharts = Highcharts

//axios
import axios from './common/axios'
Vue.$http = Vue.prototype.$http = axios

import App from './App'
import store from './store'
import router from './router'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App},
});

