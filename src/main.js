// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import 'babel-polyfill'
// import saveAs from 'file-saver'
// import 'vue-awesome/icons/flag'


// 导入elementui - js
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/base.css';
import '@/assets/css/index.css'
import '@/assets/css/frame.css'
import './assets/iconfont/iconfont.css'

// axios 在发送请求之前, 会将 baseUrl + '/users' 得到完整路径, 才会发送请求
axios.defaults.baseURL = 'http://192.168.53.24/tp5seawatch/public'

Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios
// Vue.prototype.$saveFile = saveAs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
