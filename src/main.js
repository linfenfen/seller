// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'common/stylus/index.styl'
import 'babel-polyfill'

Vue.config.productionTip = false
Vue.use(axios)
// 本地测试环境下开启
// var AUTH_TOKEN = 'NWE2MDY2YTNlODljZTkwMDEwNzQxOWJi'
// var instance = axios.create({
// })
// // 在实例已创建后修改默认值
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN
// instance.defaults.headers.post['Content-Type'] = 'application/json'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
