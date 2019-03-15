import Vue from 'vue'
import App from './App.vue'
import '@babel/polyfill'
import '../static/js/doc_C.js' // 函数参数类型验证插件
import router from './router/index.js'
import store from './store/index.js'
import device from './common/device.js'
import './common/wxjs.js' // 微信
Vue.config.productionTip = false
Vue.config.devtools = true

device(store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
