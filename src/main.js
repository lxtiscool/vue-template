import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import request from './api/request'

import VueStorage from 'vue-ls'

import './mock'

import './permission'

// 在原型上扩展,这样不用在每个页面都导入request
Vue.prototype.request = request

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueStorage)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
